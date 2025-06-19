import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const PostHackathon: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [hackathonName, setHackathonName] = useState('');
  const [hackathonDescription, setHackathonDescription] = useState('');
  const [skillsNeeded, setSkillsNeeded] = useState('');
  const [location, setLocation] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!hackathonName || !hackathonDescription || !skillsNeeded) {
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (!user) {
      toast.error('You must be logged in to post a hackathon.');
      setLoading(false);
      return;
    }

    // Prepare data for Supabase
    const insertData = {
      user_id: user.id,
      hackathon_name: hackathonName,
      project_description: hackathonDescription,
      skills_needed: skillsNeeded.split(',').map(s => s.trim()).filter(Boolean),
      location,
      team_size: teamSize ? Number(teamSize) : null,
      date: date || null,
    };

    const { error } = await supabase.from('hackathons').insert([insertData]);

    if (error) {
      toast.error('Failed to post hackathon. Please try again.');
      setLoading(false);
      return;
    }

    toast.success('Hackathon posted successfully!');
    setLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-8">
          <Link to="/dashboard" className="flex items-center text-gray-400 hover:text-gray-200 transition-colors mb-4">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
            Post a <span className="gradient-text">Hackathon</span>
          </h1>
          <p className="text-lg text-gray-300">
            Share your hackathon and attract the perfect teammates.
          </p>
        </div>

        <div className="bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="hackathonName" className="text-gray-200 mb-2 block">
                Hackathon Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="hackathonName"
                placeholder="e.g., AI for Good"
                value={hackathonName}
                onChange={(e) => setHackathonName(e.target.value)}
                className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                required
              />
            </div>

            <div>
              <Label htmlFor="hackathonDescription" className="text-gray-200 mb-2 block">
                Hackathon Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="hackathonDescription"
                placeholder="Describe your hackathon, its goals, and what you hope to achieve."
                value={hackathonDescription}
                onChange={(e) => setHackathonDescription(e.target.value)}
                rows={6}
                className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                required
              />
            </div>

            <div>
              <Label htmlFor="skillsNeeded" className="text-gray-200 mb-2 block">
                Skills Needed <span className="text-red-500">*</span>
              </Label>
              <Input
                id="skillsNeeded"
                placeholder="e.g., React, Node.js, Python, ML"
                value={skillsNeeded}
                onChange={(e) => setSkillsNeeded(e.target.value)}
                className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Comma-separated list of skills needed for this hackathon.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="location" className="text-gray-200 mb-2 block">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Online, Bangalore"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                />
              </div>
              <div>
                <Label htmlFor="teamSize" className="text-gray-200 mb-2 block">
                  Team Size
                </Label>
                <Input
                  id="teamSize"
                  type="number"
                  placeholder="e.g., 4"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-gray-200 mb-2 block">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-electric-teal to-neon-green hover:from-neon-green hover:to-electric-teal text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-teal/50 focus:ring-offset-2 focus:ring-offset-dark-200"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⚙</span> Posting...
                </>
              ) : (
                <>
                  Post Hackathon <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostHackathon;
