
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Users, User, Award, Zap, Target } from 'lucide-react';

const Landing: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Search,
      title: 'Smart Matching',
      description: 'AI-powered algorithm matches you with teammates based on skills, location, and project preferences.',
    },
    {
      icon: Users,
      title: 'Team Builder',
      description: 'Build diverse teams with complementary skills for maximum hackathon success.',
    },
    {
      icon: Target,
      title: 'Goal Oriented',
      description: 'Find teammates who share your vision and commitment to winning hackathons.',
    },
    {
      icon: Award,
      title: 'Track Record',
      description: 'View past achievements and experience levels to build winning teams.',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Developers' },
    { number: '2.5K+', label: 'Teams Formed' },
    { number: '500+', label: 'Hackathons Won' },
    { number: '50+', label: 'Cities' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 via-dark-200 to-dark-300">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-electric-cyan/5 via-transparent to-transparent" />
        <div className="absolute top-40 left-20 w-72 h-72 bg-electric-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Find Your Perfect
              <br />
              <span className="gradient-text">Hackathon Team</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect with talented developers, designers, and innovators. 
              Build amazing projects and win more hackathons together.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              {user ? (
                <Link to="/dashboard">
                  <Button className="btn-electric text-lg px-8 py-4 h-auto animate-glow">
                    <Zap className="w-5 h-5 mr-2" />
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/signup">
                    <Button className="btn-electric text-lg px-8 py-4 h-auto animate-glow">
                      <User className="w-5 h-5 mr-2" />
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="btn-ghost text-lg px-8 py-4 h-auto">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-dark-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">TeamBanalo</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We make it easy to find the right teammates for your next hackathon success story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-8 rounded-2xl hover:transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-electric-gradient rounded-xl flex items-center justify-center mb-6 group-hover:animate-glow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started in minutes and find your perfect team in three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description: 'Add your skills, experience, and what you\'re looking for in teammates.',
                color: 'from-electric-cyan to-electric-purple'
              },
              {
                step: '02',
                title: 'Find Your Match',
                description: 'Our AI algorithm suggests the best teammates based on your preferences.',
                color: 'from-electric-purple to-electric-cyan'
              },
              {
                step: '03',
                title: 'Build & Win',
                description: 'Connect with your team, collaborate, and win your next hackathon together.',
                color: 'from-electric-cyan to-electric-purple'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 font-bold text-2xl text-white`}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-electric-cyan/10 to-electric-purple/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your <span className="gradient-text">Dream Team</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of developers who are already building amazing projects together.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/signup">
                <Button className="btn-electric text-lg px-8 py-4 h-auto">
                  <Users className="w-5 h-5 mr-2" />
                  Start Building Teams
                </Button>
              </Link>
              <Link to="/find-teammates">
                <Button variant="outline" className="btn-ghost text-lg px-8 py-4 h-auto">
                  <Search className="w-5 h-5 mr-2" />
                  Browse Developers
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Landing;
