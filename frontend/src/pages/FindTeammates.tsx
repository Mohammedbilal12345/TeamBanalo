import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  Zap,
  Star,
  MessageSquare,
  User,
  Award
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const FindTeammates: React.FC = () => {
  const { user } = useAuth();

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSearchFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateWithAI = () => {
    setSearchFilters(prev => ({
      ...prev,
      projectDescription: 'A mobile app that uses AI to help students find study groups and track their learning progress. Features include smart matching, progress analytics, and collaborative study tools.',
      skillsNeeded: 'React Native, Node.js, Machine Learning, UI/UX Design'
    }));
  };

  // This replaces the old findTeammates function
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(null);

    if (!user) {
      setSubmitError("You must be logged in to submit a hackathon project.");
      setIsSubmitting(false);
      return;
    }

    // Prepare data for DB
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

    const { error } = await supabase
      .from('hackathons')
      .insert([insertData]);

    if (error) {
      setSubmitError("Failed to submit hackathon: " + error.message);
      setIsSubmitting(false);
      return;
    }

    setSubmitSuccess(true);
    setIsSubmitting(false);
    // Optionally clear form
    setSearchFilters({
      hackathonName: '',
      date: '',
      location: '',
      projectDescription: '',
      skillsNeeded: '',
      teamSize: '4'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your <span className="gradient-text">Perfect Teammates</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tell us about your hackathon project and we'll help you find the ideal teammates with complementary skills.
          </p>
        </div>

        {/* Search Form */}
        <div className="glass-card rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Project Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Hackathon Details</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-white mb-2 block">Hackathon Name</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="hackathonName"
                        value={searchFilters.hackathonName}
                        onChange={handleInputChange}
                        className="input-dark pl-11"
                        placeholder="e.g., TechCrunch Disrupt 2025"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white mb-2 block">Date</Label>
                      <Input
                        name="date"
                        type="date"
                        value={searchFilters.date}
                        onChange={handleInputChange}
                        className="input-dark"
                      />
                    </div>
                    <div>
                      <Label className="text-white mb-2 block">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          name="location"
                          value={searchFilters.location}
                          onChange={handleInputChange}
                          className="input-dark pl-11"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Team Size</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <select
                        name="teamSize"
                        value={searchFilters.teamSize}
                        onChange={handleInputChange}
                        className="input-dark pl-11 w-full"
                      >
                        <option value="2">2 members</option>
                        <option value="3">3 members</option>
                        <option value="4">4 members</option>
                        <option value="5">5 members</option>
                        <option value="6">6+ members</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Project Description */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">Project Description</h3>
                  <Button
                    onClick={generateWithAI}
                    variant="outline"
                    className="btn-ghost text-sm"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Generate with AI
                  </Button>
                </div>
                <Textarea
                  name="projectDescription"
                  value={searchFilters.projectDescription}
                  onChange={handleInputChange}
                  className="input-dark min-h-[120px]"
                  placeholder="Describe your project idea, what problem it solves, and what you want to build..."
                />
              </div>
              <div>
                <Label className="text-white mb-2 block">Skills Needed</Label>
                <Textarea
                  name="skillsNeeded"
                  value={searchFilters.skillsNeeded}
                  onChange={handleInputChange}
                  className="input-dark min-h-[80px]"
                  placeholder="List the skills and technologies you need teammates to have (e.g., React, Python, UI/UX Design, Machine Learning)"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={handleSubmit}
              className="btn-electric text-lg px-8 py-4 h-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner mr-3" />
                  Submitting...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find Teammates
                </>
              )}
            </Button>
            {submitSuccess && (
              <div className="mt-4 text-green-400 font-semibold">
                Hackathon details submitted successfully!
              </div>
            )}
            {submitError && (
              <div className="mt-4 text-red-400 font-semibold">
                {submitError}
              </div>
            )}
          </div>
        </div>

        {/* Results and other UI (not changed, you can remove or keep as needed) */}
      </div>
    </div>
  );
};

export default FindTeammates;
