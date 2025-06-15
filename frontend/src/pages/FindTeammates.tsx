import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Plus, X, Search, MapPin, Calendar, Users, Zap, ArrowRight, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const FindTeammates: React.FC = () => {
  const { user } = useAuth();

  // For teammate search and modal
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPostForm, setShowPostForm] = useState(false);
  const [search, setSearch] = useState('');

  // For hackathon posting form
  const [searchFilters, setSearchFilters] = useState({
    hackathonName: '',
    date: '',
    location: '',
    projectDescription: '',
    skillsNeeded: '',
    teamSize: '4'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Fetch all users and their hackathon postings


useEffect(() => {
  const fetchProfiles = async () => {
    setLoading(true);
    // Fetch all profiles except the current user
    const { data: profilesData } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url, bio, skills')
      .neq('id', user.id); // Exclude current user
    setProfiles(profilesData || []);
    setLoading(false);
  };
  fetchProfiles();
}, [user]);


  // For teammate search
  const filteredProfiles = profiles.filter(profile =>
    (profile.full_name?.toLowerCase() || '').includes(search.toLowerCase()) ||
    (profile.skills?.join(',').toLowerCase() || '').includes(search.toLowerCase()) ||
    (profile.bio?.toLowerCase() || '').includes(search.toLowerCase())
  );

  // Posting form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSearchFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    if (!user) {
      setSubmitError("You must be logged in to submit a hackathon project.");
      setIsSubmitting(false);
      return;
    }

    const insertData = {
      user_id: user.id,
      hackathon_name: searchFilters.hackathonName,
      date: searchFilters.date || null,
      location: searchFilters.location,
      team_size: Number(searchFilters.teamSize) || null,
      project_description: searchFilters.projectDescription,
      skills_needed: searchFilters.skillsNeeded
        ? searchFilters.skillsNeeded.split(',').map(s => s.trim()).filter(Boolean)
        : [],
    };

    const { error } = await supabase.from('hackathons').insert([insertData]);

    if (error) {
      setSubmitError("Failed to submit hackathon: " + error.message);
      setIsSubmitting(false);
      return;
    }

    setSubmitSuccess(true);
    setIsSubmitting(false);
    setShowPostForm(false);
    // Optionally: refresh profiles to show new posting
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find <span className="gradient-text">Teammates</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Browse users, see their skills and hackathon posts, and reach out to collaborate!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <Input
            className="w-full max-w-md"
            placeholder="Search by name, skills, or bio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* All Users */}
        {loading ? (
          <div className="text-gray-400 text-center py-12">Loading teammates...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProfiles.map(profile => (
              <div
  key={profile.id}
  className="bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 p-6 rounded-2xl shadow-lg flex flex-col gap-3"
>
  <div className="flex items-center gap-4 mb-2">
    <img
      src={profile.avatar_url || '/default-avatar.png'}
      alt={profile.full_name}
      className="w-12 h-12 rounded-full object-cover border-2 border-electric-blue"
    />
    <div>
      <h3 className="text-lg font-bold text-white">{profile.full_name}</h3>
      <div className="text-xs text-gray-400">{profile.email}</div>
    </div>
  </div>
  <div className="mb-2 text-gray-300 text-sm">{profile.bio}</div>
  <div className="flex flex-wrap gap-2 mb-2">
    {profile.skills?.map((skill: string) => (
      <span key={skill} className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs">{skill}</span>
    ))}
  </div>
  <a
    href={`mailto:${profile.email}`}
    className="mt-2 w-full inline-flex items-center justify-center border border-electric-blue text-electric-blue rounded-lg py-2 px-4 hover:bg-electric-blue/10 transition"
    target="_blank"
    rel="noopener noreferrer"
  >
    <MessageSquare className="w-4 h-4 mr-2" /> Reach Out
  </a>
</div>

            ))}
          </div>
        )}

        {/* Floating button to post new hackathon */}
        <button
          className="fixed bottom-8 right-8 z-50 bg-electric-blue hover:bg-electric-teal text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-200"
          onClick={() => setShowPostForm(true)}
          title="Post New Hackathon"
        >
          <Plus className="w-7 h-7" />
        </button>

        {/* Modal for posting new hackathon */}
        {showPostForm && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-dark-200 rounded-2xl p-8 max-w-lg w-full relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setShowPostForm(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-6">Post a Hackathon</h2>
              {/* Same form as before */}
              <div className="space-y-4">
                <Input
                  name="hackathonName"
                  value={searchFilters.hackathonName}
                  onChange={handleInputChange}
                  className="input-dark"
                  placeholder="Hackathon Name"
                />
                <Input
                  name="date"
                  type="date"
                  value={searchFilters.date}
                  onChange={handleInputChange}
                  className="input-dark"
                  placeholder="Date"
                />
                <Input
                  name="location"
                  value={searchFilters.location}
                  onChange={handleInputChange}
                  className="input-dark"
                  placeholder="Location"
                />
                <Input
                  name="teamSize"
                  value={searchFilters.teamSize}
                  onChange={handleInputChange}
                  className="input-dark"
                  placeholder="Team Size"
                />
                <Textarea
                  name="projectDescription"
                  value={searchFilters.projectDescription}
                  onChange={handleInputChange}
                  className="input-dark"
                  placeholder="Project Description"
                />
                <Textarea
                  name="skillsNeeded"
                  value={searchFilters.skillsNeeded}
                  onChange={handleInputChange}
                  className="input-dark"
                  placeholder="Skills Needed (comma separated)"
                />
                <Button onClick={handleSubmit} className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Hackathon"}
                </Button>
                {submitSuccess && (
                  <div className="mt-2 text-green-400 text-center">Hackathon posted!</div>
                )}
                {submitError && (
                  <div className="mt-2 text-red-400 text-center">{submitError}</div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FindTeammates;
