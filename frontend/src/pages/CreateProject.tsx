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

const CreateProject: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!projectName || !projectDescription || !requiredSkills || !lookingFor) {
      toast.error('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (!user) {
      toast.error('You must be logged in to post a project.');
      setLoading(false);
      return;
    }

    // Prepare data for Supabase
    const insertData = {
      user_id: user.id,
      project_name: projectName,
      project_description: projectDescription,
      required_skills: requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
      looking_for: lookingFor.split(',').map(s => s.trim()).filter(Boolean),
    };

    const { error } = await supabase.from('projects').insert([insertData]);

    if (error) {
      toast.error('Failed to post project idea. Please try again.');
      setLoading(false);
      return;
    }

    toast.success('Project idea posted successfully!');
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
            Post Your <span className="gradient-text">Project Idea</span>
          </h1>
          <p className="text-lg text-gray-300">
            Share your hackathon project idea and attract the perfect teammates.
          </p>
        </div>

        <div className="bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="projectName" className="text-gray-200 mb-2 block">
                Project Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="projectName"
                placeholder="e.g., AI-Powered Recipe Generator"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                required
              />
            </div>

            <div>
              <Label htmlFor="projectDescription" className="text-gray-200 mb-2 block">
                Project Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="projectDescription"
                placeholder="Describe your project idea in detail, its goals, and what you hope to achieve."
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={6}
                className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                required
              />
            </div>

            <div>
              <Label htmlFor="requiredSkills" className="text-gray-200 mb-2 block">
                Required Skills <span className="text-red-500">*</span>
              </Label>
              <Input
                id="requiredSkills"
                placeholder="e.g., React, Node.js, Python, ML"
                value={requiredSkills}
                onChange={(e) => setRequiredSkills(e.target.value)}
                className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Comma-separated list of skills needed for this project.</p>
            </div>

            <div>
              <Label htmlFor="lookingFor" className="text-gray-200 mb-2 block">
                Looking For (Roles/Expertise) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lookingFor"
                placeholder="e.g., Frontend Developer, UI/UX Designer, Data Scientist"
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                className="bg-dark-200 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-electric-blue focus:ring-electric-blue"
                required
              />
              <p className="text-sm text-gray-500 mt-1">What kind of teammates are you looking for?</p>
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
                  Post Project Idea <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
