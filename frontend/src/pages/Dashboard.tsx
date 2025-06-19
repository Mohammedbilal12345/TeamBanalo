import React , {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

import { 
  User, 
  Search, 
  Plus, 
  Award, 
  Users, 
  Calendar,
  ArrowRight,
  Zap,
  Target,
  Trash,
  X
} from 'lucide-react';
const Dashboard: React.FC = () => {
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  // Calculate profile completion percentage based on profile data
  const calculateProfileCompletion = () => {
    if (!profile) return 25;
    
    let completion = 0;
    if (profile.full_name) completion += 20;
    if (profile.email) completion += 20;
    if (profile.avatar_url) completion += 20;
    if (profile.resume_url) completion += 20;
    
    // Assume additional fields would add more completion
    completion += 20; // Base completion for having a profile
    
    return Math.min(completion, 100);
  };

  const profileCompletion = calculateProfileCompletion();
  const isProfileIncomplete = profileCompletion < 80;

  

  const quickActions = [
    {
      title: 'Complete Profile',
      description: 'Add your skills and experience to get better matches',
      icon: User,
      link: '/profile',
      color: 'from-electric-blue to-electric-teal',
      urgent: isProfileIncomplete
    },
    {
      title: 'Find Teammates',
      description: 'Browse and connect with talented developers',
      icon: Search,
      link: '/find-teammates',
      color: 'from-electric-purple to-electric-pink'
    },
    {
    title: 'New Post',
    description: 'Share a project or hackathon and attract teammates',
    icon: Plus,
    // No link, will trigger modal
    color: 'from-electric-teal to-neon-green',
    action: () => setShowNewPostModal(true)
  }
  ];


  const recentActivity = [
    {
      type: 'match',
      message: 'New teammate match found: Sarah Chen',
      time: '2 hours ago',
      icon: Users
    },
    {
      type: 'invitation',
      message: 'Team invitation from DevHack 2025',
      time: '1 day ago',
      icon: Calendar
    },
    {
      type: 'achievement',
      message: 'Profile completion: 85%',
      time: '2 days ago',
      icon: Award
    }
  ];

  const upcomingHackathons = [
    {
      name: 'TechCrunch Disrupt',
      date: 'Jan 15-17, 2025',
      location: 'San Francisco, CA',
      participants: 1200
    },
    {
      name: 'MLH Spring Kickoff',
      date: 'Jan 22-24, 2025',
      location: 'Virtual',
      participants: 800
    },
    {
      name: 'University Hackathon',
      date: 'Feb 5-7, 2025',
      location: 'Boston, MA',
      participants: 400
    }
  ];

   // --- NEW: Fetch and display user's own posts ---
  const [myHackathons, setMyHackathons] = useState<any[]>([]);
  const [myProjects, setMyProjects] = useState<any[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

   useEffect(() => {
    if (!user) return;
    setLoadingPosts(true);
    // Fetch user's hackathons
    supabase
      .from('hackathons')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setMyHackathons(data || []));
    // Fetch user's projects
    supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setMyProjects(data || []));
    setLoadingPosts(false);
  }, [user]);
  // --- END NEW ---

  const handleDeleteHackathon = async (id: string) => {
  await supabase.from('hackathons').delete().eq('id', id);
  setMyHackathons(myHackathons.filter(h => h.id !== id));
};

const handleDeleteProject = async (id: string) => {
  await supabase.from('projects').delete().eq('id', id);
  setMyProjects(myProjects.filter(p => p.id !== id));
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4">
                Welcome back, <span className="gradient-text">{profile?.full_name || user?.email}</span>! 👋
              </h1>
              <p className="text-lg sm:text-xl text-gray-300">
                Ready to find your next hackathon teammates?
              </p>
            </div>
            
            {!isProfileIncomplete && (
              <div className="mt-4 lg:mt-0">
                <div className="flex items-center space-x-4 bg-dark-300/50 backdrop-blur-sm border border-gray-700/50 px-6 py-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                    <span className="text-neon-green font-medium text-sm sm:text-base">Profile Complete</span>
                  </div>
                  <div className="text-gray-500">|</div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-electric-blue" />
                    <span className="text-gray-200 text-sm sm:text-base">Ready to match</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Profile Completion Alert */}
          {isProfileIncomplete && (
            <div className="mt-8 bg-gradient-to-r from-yellow-500/10 via-yellow-400/10 to-yellow-500/10 border border-yellow-400/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2 sm:mb-0">
                      Complete Your Profile
                    </h3>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-300 font-medium">{profileCompletion}% complete</span>
                      <div className="w-20 sm:w-24">
                        <Progress value={profileCompletion} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Add your skills, experience, and preferences to get better teammate matches 
                    and increase your chances of joining winning teams.
                  </p>
                  <Link to="/profile">
                    <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-offset-2 focus:ring-offset-dark-200">
                      Complete Profile Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Quick Actions */}
        <div className="mb-8 sm:mb-12">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6 sm:mb-8">Quick Actions</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {quickActions.map((action, index) =>
      action.action ? (
        <button
          key={index}
          type="button"
          onClick={action.action}
          className="group w-full text-left"
        >
          <div className={`
            bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 
            p-6 sm:p-8 rounded-2xl transition-all duration-300 
            hover:bg-dark-300/60 hover:border-gray-600/50 
            hover:shadow-2xl hover:scale-105 
            focus-within:ring-2 focus-within:ring-electric-blue/50 
            focus-within:ring-offset-2 focus-within:ring-offset-dark-200
            ${action.urgent ? 'ring-2 ring-yellow-400/30 shadow-lg shadow-yellow-400/10' : ''}
          `}>
            <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              <action.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-white transition-colors">
              {action.title}
              {action.urgent && <span className="ml-2 text-yellow-400 animate-pulse">⚡</span>}
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
              {action.description}
            </p>
            <div className="flex items-center text-electric-blue font-semibold group-hover:text-electric-teal transition-colors">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </button>
      ) : (
        <Link key={index} to={action.link} className="group">
          <div className={`
            bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 
            p-6 sm:p-8 rounded-2xl transition-all duration-300 
            hover:bg-dark-300/60 hover:border-gray-600/50 
            hover:shadow-2xl hover:scale-105 
            focus-within:ring-2 focus-within:ring-electric-blue/50 
            focus-within:ring-offset-2 focus-within:ring-offset-dark-200
            ${action.urgent ? 'ring-2 ring-yellow-400/30 shadow-lg shadow-yellow-400/10' : ''}
          `}>
            <div className={`w-14 h-14 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              <action.icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-100 mb-3 group-hover:text-white transition-colors">
              {action.title}
              {action.urgent && <span className="ml-2 text-yellow-400 animate-pulse">⚡</span>}
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
              {action.description}
            </p>
            <div className="flex items-center text-electric-blue font-semibold group-hover:text-electric-teal transition-colors">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </Link>
      )
    )}
  </div>
</div>

{/* Popup */}

{showNewPostModal && (
  <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
    <div className="bg-dark-200 rounded-2xl p-8 max-w-xs w-full relative">
      <button
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
        onClick={() => setShowNewPostModal(false)}
      >
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-bold text-white mb-6 text-center">What would you like to post?</h2>
      <div className="flex flex-col gap-4">
        <Button
          className="w-full"
          onClick={() => {
            setShowNewPostModal(false);
            navigate("/post-project");
          }}
        >
          Project
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            setShowNewPostModal(false);
            navigate("/post-hackathon");
          }}
        >
          Hackathon
        </Button>
      </div>
    </div>
  </div>
)}

        

        {/* My Posts Section */}
<div className="mb-12">
  <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6 sm:mb-8">My Posts</h2>
  {loadingPosts ? (
    <div className="text-gray-400">Loading your posts...</div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* User's Hackathons */}
      {myHackathons.map(h => (
  <div key={h.id} className="bg-dark-300/40 border border-gray-700/50 rounded-2xl p-6 shadow-lg relative">
    <button
      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
      title="Delete"
      onClick={() => handleDeleteHackathon(h.id)}
    >
      <Trash className="w-5 h-5" />
    </button>
    <h3 className="text-lg font-bold text-white mb-2">{h.hackathon_name}</h3>
    <div className="text-gray-400 text-sm mb-1">{h.location} • {h.date}</div>
    <div className="text-gray-300 text-sm mb-2">{h.project_description}</div>
    <div className="flex flex-wrap gap-2 mb-2">
      {h.skills_needed?.map((skill: string) => (
        <span key={skill} className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs">{skill}</span>
      ))}
    </div>
    <div className="text-xs text-gray-400">Team size: {h.team_size || "?"}</div>
  </div>
))}
{myProjects.map(p => (
  <div key={p.id} className="bg-dark-300/40 border border-gray-700/50 rounded-2xl p-6 shadow-lg relative">
    <button
      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
      title="Delete"
      onClick={() => handleDeleteProject(p.id)}
    >
      <Trash className="w-5 h-5" />
    </button>
    <h3 className="text-lg font-bold text-white mb-2">{p.project_name}</h3>
    <div className="text-gray-300 text-sm mb-2">{p.project_description}</div>
    <div className="mb-2">
      <span className="font-semibold text-xs text-gray-400">Required Skills: </span>
      {p.required_skills?.map((skill: string) => (
        <span key={skill} className="bg-green-900 text-green-200 px-2 py-0.5 rounded text-xs mr-1">{skill}</span>
      ))}
    </div>
    <div>
      <span className="font-semibold text-xs text-gray-400">Looking For: </span>
      {p.looking_for?.map((role: string) => (
        <span key={role} className="bg-purple-900 text-purple-200 px-2 py-0.5 rounded text-xs mr-1">{role}</span>
      ))}
    </div>
  </div>
))}
     
      {/* If no posts */}
      {myHackathons.length === 0 && myProjects.length === 0 && (
        <div className="text-gray-400 col-span-full text-center py-8">
          You haven't posted any hackathons or projects yet.
        </div>
      )}
    </div>
  )}
</div>


        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Enhanced Recent Activity */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6 sm:mb-8">Recent Activity</h2>
            <div className="bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-xl hover:bg-dark-300/50 transition-colors duration-300">
              <div className="space-y-6">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-800/30 rounded-xl transition-all duration-200 group">
                    <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-electric-purple rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                      <activity.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-200 font-medium group-hover:text-white transition-colors">{activity.message}</p>
                      <p className="text-gray-500 text-sm mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                <Link to="/activity">
                  <Button variant="ghost" className="w-full bg-gray-800/30 hover:bg-gray-700/50 text-gray-200 hover:text-white border border-gray-700/50 hover:border-gray-600/50 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-electric-blue/50">
                    View All Activity
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Upcoming Hackathons */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-6 sm:mb-8">Upcoming Hackathons</h2>
            <div className="bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-xl hover:bg-dark-300/50 transition-colors duration-300">
              <div className="space-y-6">
                {upcomingHackathons.map((hackathon, index) => (
                  <div key={index} className="p-4 sm:p-5 border border-gray-700/50 rounded-xl hover:border-electric-blue/40 hover:bg-gray-800/20 transition-all duration-200 group">
                    <h3 className="text-gray-100 font-bold mb-3 group-hover:text-white transition-colors text-lg">{hackathon.name}</h3>
                    <div className="space-y-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      <p className="flex items-center">
                        <span className="mr-2">📅</span>
                        {hackathon.date}
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">📍</span>
                        {hackathon.location}
                      </p>
                      <p className="flex items-center">
                        <span className="mr-2">👥</span>
                        {hackathon.participants.toLocaleString()} participants
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-700/50">
                {/* "Browse All Hackathons" - now redirects to Devfolio */}
                <a 
                  href="https://devfolio.co/hackathons" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full block" 
                >
                  <Button variant="ghost" className="w-full bg-gray-800/30 hover:bg-gray-700/50 text-gray-200 hover:text-white border border-gray-700/50 hover:border-gray-600/50 py-3 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-electric-blue/50">
                    Browse All Hackathons
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced AI Recommendations */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-xl hover:bg-dark-300/50 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">
                  AI Recommendations
                  <span className="ml-3 text-electric-blue animate-pulse">✨</span>
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Personalized suggestions based on your profile and activity
                </p>
              </div>
              <Target className="w-10 h-10 text-electric-blue mt-4 sm:mt-0" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-700/50 rounded-xl p-6 hover:border-electric-blue/30 hover:bg-gray-800/20 transition-all duration-300 group">
                <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-4 group-hover:text-white transition-colors">
                  Recommended Teammates
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Based on your React and Node.js skills, we found 12 potential teammates 
                  for upcoming hackathons.
                </p>
                <Link to="/find-teammates">
                  <Button className="bg-gradient-to-r from-electric-blue to-electric-purple hover:from-electric-purple hover:to-electric-pink text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 focus:ring-offset-2 focus:ring-offset-dark-200">
                    View Matches
                  </Button>
                </Link>
              </div>

              <div className="border border-gray-700/50 rounded-xl p-6 hover:border-electric-blue/30 hover:bg-gray-800/20 transition-all duration-300 group">
                <h3 className="text-lg sm:text-xl font-bold text-gray-100 mb-4 group-hover:text-white transition-colors">
                  Suggested Hackathons
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors">
                  3 hackathons matching your interests in web development and AI 
                  are happening near you.
                </p>
                {/* "Explore Events" - now redirects to Devfolio */}
                <a
                  href="https://devfolio.co/hackathons"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block" 
                >
                  <Button className="bg-gradient-to-r from-electric-teal to-neon-green hover:from-neon-green hover:to-electric-teal text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-electric-teal/50 focus:ring-offset-2 focus:ring-offset-dark-200">
                    Explore Events
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;