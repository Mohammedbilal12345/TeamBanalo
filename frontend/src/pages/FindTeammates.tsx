
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
  Award,
  Clock
} from 'lucide-react';

const FindTeammates: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    hackathonName: '',
    date: '',
    location: '',
    projectDescription: '',
    skillsNeeded: '',
    teamSize: '4'
  });

  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setSearchFilters(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const generateWithAI = () => {
    // Simulate AI generation
    setSearchFilters(prev => ({
      ...prev,
      projectDescription: 'A mobile app that uses AI to help students find study groups and track their learning progress. Features include smart matching, progress analytics, and collaborative study tools.',
      skillsNeeded: 'React Native, Node.js, Machine Learning, UI/UX Design'
    }));
  };

  const findTeammates = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          name: 'Sarah Chen',
          title: 'Full-Stack Developer',
          college: 'Stanford University',
          location: 'San Francisco, CA',
          skills: ['React', 'Node.js', 'Python', 'MongoDB'],
          rating: 4.9,
          hackathonsWon: 5,
          availability: 'Available',
          profilePicture: null,
          bio: 'Passionate developer with 3 years of experience. Love building innovative solutions and have won multiple hackathons.',
          matchPercentage: 95
        },
        {
          id: 2,
          name: 'Alex Rodriguez',
          title: 'UI/UX Designer',
          college: 'UC Berkeley',
          location: 'Berkeley, CA',
          skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
          rating: 4.8,
          hackathonsWon: 3,
          availability: 'Available',
          profilePicture: null,
          bio: 'Creative designer focused on creating intuitive user experiences. Always excited about new challenges.',
          matchPercentage: 88
        },
        {
          id: 3,
          name: 'Marcus Johnson',
          title: 'Backend Engineer',
          college: 'MIT',
          location: 'Boston, MA',
          skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
          rating: 4.7,
          hackathonsWon: 7,
          availability: 'Busy until Jan 20',
          profilePicture: null,
          bio: 'Backend specialist with expertise in scalable systems. Love working on complex technical challenges.',
          matchPercentage: 82
        },
        {
          id: 4,
          name: 'Emma Wilson',
          title: 'Data Scientist',
          college: 'Carnegie Mellon',
          location: 'Pittsburgh, PA',
          skills: ['Python', 'TensorFlow', 'Machine Learning', 'Data Analysis'],
          rating: 4.9,
          hackathonsWon: 4,
          availability: 'Available',
          profilePicture: null,
          bio: 'ML engineer passionate about using data to solve real-world problems. Quick learner and team player.',
          matchPercentage: 91
        }
      ]);
      setIsSearching(false);
    }, 2000);
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

          {/* Search Button */}
          <div className="mt-8 text-center">
            <Button
              onClick={findTeammates}
              className="btn-electric text-lg px-8 py-4 h-auto"
              disabled={isSearching}
            >
              {isSearching ? (
                <>
                  <div className="spinner mr-3" />
                  Finding Teammates...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find Teammates
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Recommended Teammates ({searchResults.length})
              </h2>
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="btn-ghost"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-white mb-2 block">Experience Level</Label>
                    <select className="input-dark w-full">
                      <option>All levels</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Availability</Label>
                    <select className="input-dark w-full">
                      <option>All</option>
                      <option>Available now</option>
                      <option>Available soon</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Location</Label>
                    <select className="input-dark w-full">
                      <option>All locations</option>
                      <option>Same city</option>
                      <option>Same state</option>
                      <option>Remote only</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-white mb-2 block">Min Rating</Label>
                    <select className="input-dark w-full">
                      <option>Any rating</option>
                      <option>4.0+</option>
                      <option>4.5+</option>
                      <option>4.8+</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((teammate) => (
                <div key={teammate.id} className="glass-card rounded-2xl p-6 card-hover">
                  {/* Match Percentage Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-electric-gradient text-white text-sm font-bold px-3 py-1 rounded-full">
                      {teammate.matchPercentage}% Match
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      teammate.availability === 'Available' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {teammate.availability}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-electric-gradient rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                      {teammate.profilePicture ? (
                        <img 
                          src={teammate.profilePicture} 
                          alt={teammate.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        teammate.name.charAt(0)
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{teammate.name}</h3>
                    <p className="text-electric-blue text-sm">{teammate.title}</p>
                    <p className="text-gray-400 text-sm">{teammate.college}</p>
                    <p className="text-gray-400 text-sm flex items-center justify-center mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {teammate.location}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-center space-x-6 mb-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center text-yellow-400 mb-1">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{teammate.rating}</span>
                      </div>
                      <p className="text-xs text-gray-400">Rating</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-electric-blue mb-1">
                        <Award className="w-4 h-4 mr-1" />
                        <span className="font-semibold">{teammate.hackathonsWon}</span>
                      </div>
                      <p className="text-xs text-gray-400">Wins</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {teammate.skills.slice(0, 3).map((skill: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-electric-blue/20 text-electric-blue px-2 py-1 rounded text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {teammate.skills.length > 3 && (
                        <span className="bg-white/10 text-gray-400 px-2 py-1 rounded text-xs">
                          +{teammate.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-400 text-sm text-center mb-6 line-clamp-2">
                    {teammate.bio}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button className="flex-1 btn-electric">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                    <Button variant="outline" className="flex-1 btn-ghost">
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="btn-ghost">
                Load More Results
              </Button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {searchResults.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-electric-gradient/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-electric-blue" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Find Your Team?
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Fill out the form above with your hackathon details and we'll find the perfect teammates for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindTeammates;
