// import { supabase } from "@/integrations/supabase/client";
// import React, { useState, useRef } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { useToast } from '@/hooks/use-toast';
// import { 
//   User, 
//   Mail, 
//   MapPin, 
//   GraduationCap, 
//   Upload, 
//   X,
//   Plus,
//   Save,
//   Camera,
//   FileText
// } from 'lucide-react';

// const Profile: React.FC = () => {
//   const { user, profile, updateProfile, uploadAvatar, uploadResume } = useAuth();
//   const { toast } = useToast();
//   const [isEditing, setIsEditing] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);
//   const [formData, setFormData] = useState({
//   full_name: profile?.full_name || '',
//   email: profile?.email || '',
//   college: profile?.college || '',
//   city: profile?.city || '',
//   state: profile?.state || '',
//   bio: profile?.bio || '',
//   skills: profile?.skills || [],
//   team_size_pref: profile?.team_size_pref || '',
//   experience_level: profile?.experience_level || '',
//   hackathon_type: profile?.hackathon_type || '',
//   availability: profile?.availability || ''
// });

//   const avatarInputRef = useRef<HTMLInputElement>(null);
//   const resumeInputRef = useRef<HTMLInputElement>(null);
  
  

//   const [newSkill, setNewSkill] = useState('');

// const handleInputChange = (
//   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
// ) => {
//   setFormData(prev => ({
//     ...prev,
//     [e.target.name]: e.target.value
//   }));
// };

// const handleAddSkill = () => {
//   if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
//     setFormData(prev => ({
//       ...prev,
//       skills: [...prev.skills, newSkill.trim()]
//     }));
//     setNewSkill('');
//   }
// };

// const handleRemoveSkill = (skillToRemove: string) => {
//   setFormData(prev => ({
//     ...prev,
//     skills: prev.skills.filter(skill => skill !== skillToRemove)
//   }));
// };

// const handleSave = async () => {
//   try {
//     await updateProfile({
//       full_name: formData.full_name,
//       email: formData.email,
//       college: formData.college,
//       city: formData.city,
//       state: formData.state,
//       bio: formData.bio,
//       skills: formData.skills,
//       team_size_pref: formData.team_size_pref,
//       experience_level: formData.experience_level,
//       hackathon_type: formData.hackathon_type,
//       availability: formData.availability,
//     });

//     // Call the summary API, but handle errors separately
//     try {
//       const response = await fetch(`http://127.0.0.1:8000/generate-summary/${user.id}`);
//       if (!response.ok) {
//         // Optionally, show a warning toast if summary fails, but don't treat as fatal
//         toast({
//           title: "Profile updated",
//           description: "Profile updated, but summary generation failed.",
//           variant: "warning",
//         });
//         setIsEditing(false);
//         return;
//       }
//     } catch (summaryError) {
//       // Optionally, show a different toast if fetch itself fails
//       toast({
//         title: "Profile updated",
//         description: "Profile updated, but summary generation failed (network error).",
//         variant: "warning",
//       });
//       setIsEditing(false);
//       return;
//     }

//     setIsEditing(false);
//     toast({
//       title: "Profile updated",
//       description: "Your profile has been successfully updated.",
//     });
//   } catch (error) {
//     toast({
//       title: "Error",
//       description: "Failed to update profile. Please try again.",
//       variant: "destructive",
//     });
//   }
// };


//   const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);
//     try {
//       await uploadAvatar(file);
//       toast({
//         title: "Avatar updated",
//         description: "Your profile picture has been successfully updated.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to upload avatar. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setIsUploading(true);
//     try {
//       await uploadResume(file);
//       toast({
//         title: "Resume uploaded",
//         description: "Your resume has been successfully uploaded.",
//       });
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to upload resume. Please try again.",
//         variant: "destructive",
//       });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const skillSuggestions = [
//     'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL',
//     'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Data Science',
//     'UI/UX Design', 'Figma', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'Vue.js',
//     'Angular', 'Django', 'Flask', 'Express.js', 'Go', 'Rust', 'Java', 'C++', 'PHP'
//   ];

  
//   if (!user || !profile) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20 flex items-center justify-center">
//         <div className="text-white text-xl">Loading profile...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-4xl font-bold text-white mb-2">
//               Your Profile
//             </h1>
//             <p className="text-gray-400">
//               {isEditing ? 'Edit your information to get better teammate matches' : 'Manage your profile and preferences'}
//             </p>
//           </div>
          
//           <Button
//             onClick={() => isEditing ? handleSave() : setIsEditing(true)}
//             className={isEditing ? "btn-electric" : "btn-ghost"}
//             disabled={isUploading}
//           >
//             {isEditing ? (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 Save Changes
//               </>
//             ) : (
//               <>
//                 <User className="w-4 h-4 mr-2" />
//                 Edit Profile
//               </>
//             )}
//           </Button>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Profile Picture & Basic Info */}
//           <div className="lg:col-span-1">
//             <div className="glass-card p-6 rounded-2xl">
//               {/* Profile Picture */}
//               <div className="text-center mb-6">
//                 <div className="relative inline-block">
//                   <div className="w-32 h-32 bg-electric-gradient rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 overflow-hidden">
//                     {profile.avatar_url ? (
//                       <img 
//                         src={profile.avatar_url} 
//                         alt="Profile" 
//                         className="w-full h-full rounded-full object-cover"
//                       />
//                     ) : (
//                       profile.full_name?.charAt(0).toUpperCase() || 'U'
//                     )}
//                   </div>
//                   {isEditing && (
//                     <>
//                       <button 
//                         onClick={() => avatarInputRef.current?.click()}
//                         disabled={isUploading}
//                         className="absolute bottom-2 right-2 w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center hover:bg-electric-teal transition-colors disabled:opacity-50"
//                       >
//                         <Camera className="w-5 h-5 text-white" />
//                       </button>
//                       <input
//                         ref={avatarInputRef}
//                         type="file"
//                         accept="image/jpeg,image/png,image/webp"
//                         onChange={handleAvatarUpload}
//                         className="hidden"
//                       />
//                     </>
//                   )}
//                 </div>
//                 <h2 className="text-2xl font-bold text-white">{profile.full_name}</h2>
//                 <p className="text-gray-400">{profile.email}</p>
//                 <div className="mt-2 flex items-center justify-center text-electric-blue">
//                   <span className="text-sm font-medium">{profile.credits} credits</span>
//                 </div>
//               </div>

//               {/* Resume Upload */}
//               <div 
//                 onClick={() => resumeInputRef.current?.click()}
//                 className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-electric-blue/50 transition-colors cursor-pointer"
//               >
//                 {profile.resume_url ? (
//                   <>
//                     <FileText className="w-8 h-8 text-electric-blue mx-auto mb-2" />
//                     <p className="text-electric-blue text-sm mb-2">
//                       {profile.resume_filename || 'Resume uploaded'}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       Click to update resume
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
//                     <p className="text-gray-400 text-sm mb-2">
//                       Upload Resume
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       PDF (Max 10MB)
//                     </p>
//                   </>
//                 )}
//               </div>
//               <input
//                 ref={resumeInputRef}
//                 type="file"
//                 accept="application/pdf"
//                 onChange={handleResumeUpload}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           {/* Detailed Information */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Personal Information */}
//             <div className="glass-card p-6 rounded-2xl">
//               <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <Label className="text-white mb-2 block">Full Name</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <Input
//                       name="full_name"
//                       value={formData.full_name}
//                       onChange={handleInputChange}
//                       className="input-dark pl-11"
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label className="text-white mb-2 block">Email</Label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <Input
//                       name="email"
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       className="input-dark pl-11"
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label className="text-white mb-2 block">College/University</Label>
//                   <div className="relative">
//                     <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <Input
//                       name="college"
//                       value={formData.college}
//                       onChange={handleInputChange}
//                       className="input-dark pl-11"
//                       placeholder="Enter your college/university"
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label className="text-white mb-2 block">Location</Label>
//                   <div className="flex space-x-3">
//                     <div className="relative flex-1">
//                       <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                       <Input
//                         name="city"
//                         value={formData.city}
//                         onChange={handleInputChange}
//                         className="input-dark pl-11"
//                         placeholder="City"
//                         disabled={!isEditing}
//                       />
//                     </div>
//                     <Input
//                       name="state"
//                       value={formData.state}
//                       onChange={handleInputChange}
//                       className="input-dark flex-1"
//                       placeholder="State"
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <Label className="text-white mb-2 block">Bio</Label>
//                 <Textarea
//                   name="bio"
//                   value={formData.bio}
//                   onChange={handleInputChange}
//                   className="input-dark min-h-[100px]"
//                   placeholder="Tell us about yourself, your interests, and what you're looking for in teammates..."
//                   disabled={!isEditing}
//                 />
//               </div>
//             </div>

//             {/* Skills */}
//             <div className="glass-card p-6 rounded-2xl">
//               <h3 className="text-xl font-bold text-white mb-6">Skills & Technologies</h3>
              
//               {/* Current Skills */}
//               <div className="mb-6">
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {formData.skills.map((skill, index) => (
//                     <div 
//                       key={index}
//                       className="bg-electric-blue/20 text-electric-blue px-3 py-1 rounded-full text-sm flex items-center"
//                     >
//                       {skill}
//                       {isEditing && (
//                         <button
//                           onClick={() => handleRemoveSkill(skill)}
//                           className="ml-2 hover:text-red-400 transition-colors"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {formData.skills.length === 0 && (
//                   <p className="text-gray-400 text-sm">No skills added yet. Add your first skill below!</p>
//                 )}
//               </div>

//               {/* Add New Skill */}
//               {isEditing && (
//                 <div className="space-y-4">
//                   <div className="flex space-x-3">
//                     <Input
//                       value={newSkill}
//                       onChange={(e) => setNewSkill(e.target.value)}
//                       className="input-dark"
//                       placeholder="Add a skill (e.g., React, Python, UI/UX)"
//                       onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
//                     />
//                     <Button
//                       onClick={handleAddSkill}
//                       className="btn-electric"
//                       disabled={!newSkill.trim()}
//                     >
//                       <Plus className="w-4 h-4" />
//                     </Button>
//                   </div>

//                   {/* Skill Suggestions */}
//                   <div>
//                     <p className="text-gray-400 text-sm mb-2">Popular skills:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {skillSuggestions
//                         .filter(skill => !formData.skills.includes(skill))
//                         .slice(0, 10)
//                         .map((skill, index) => (
//                           <button
//                             key={index}
//                             onClick={() => {
//                               setFormData(prev => ({
//                                 ...prev,
//                                 skills: [...prev.skills, skill]
//                               }));
//                             }}
//                             className="bg-white/5 hover:bg-electric-blue/20 text-gray-300 hover:text-electric-blue px-3 py-1 rounded-full text-sm transition-colors"
//                           >
//                             + {skill}
//                           </button>
//                         ))
//                       }
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Hackathon Preferences */}
//             {/* <div className="glass-card p-6 rounded-2xl">
//               <h3 className="text-xl font-bold text-white mb-6">Hackathon Preferences</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <Label className="text-white mb-2 block">Preferred Team Size</Label>
//                   <select className="input-dark w-full" value={formData.team_size_pref} disabled={!isEditing} onChange={handleInputChange}>
//                     <option value="">Select</option>
//                     <option value="2-3">2-3 members</option>
//                     <option value="4-5">4-5 members</option>
//                     <option value="6+">6+ members</option>
//                     <option value="No preference">No preference</option>
//                   </select>
//                 </div>

//                 <div>
//                   <Label className="text-white mb-2 block">Experience Level</Label>
//                   <select className="input-dark w-full" disabled={!isEditing} value={formData.experience_level} onChange={handleInputChange}>
//                     <option value="">Select</option>
//   <option value="Beginner">Beginner (0-1 years)</option>
//   <option value="Intermediate">Intermediate (2-4 years)</option>
//   <option value="Advanced">Advanced (5+ years)</option>
//                   </select>
//                 </div>

//                 <div>
//                   <Label className="text-white mb-2 block">Hackathon Types</Label>
//                   <select className="input-dark w-full" disabled={!isEditing} value={formData.hackathon_type} onChange={handleInputChange}>
//                     <option value="">Select</option>
//   <option value="In-person">In-person events</option>
//   <option value="Virtual">Virtual events</option>
//   <option value="Both">Both</option>
//                   </select>
//                 </div>

//                 <div>
//                   <Label className="text-white mb-2 block">Availability</Label>
//                   <select className="input-dark w-full" disabled={!isEditing} value={formData.availability} onChange={handleInputChange}>
//                     <option value="">Select</option>
//                     <option value="Weekends only">Weekends only</option>
//                     <option value="Weekdays">Weekdays</option>
//                     <option value="Both">Both</option>
//                   </select>
//                 </div>
//               </div>
//             </div> */}
//             <div className="glass-card p-6 rounded-2xl">
//   <h3 className="text-xl font-bold text-white mb-6">Hackathon Preferences</h3>
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//     <div>
//       <Label className="text-white mb-2 block">Preferred Team Size</Label>
//       <select
//         className="input-dark w-full"
//         name="team_size_pref"
//         value={formData.team_size_pref}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//       >
//         <option value="">Select</option>
//         <option value="2-3">2-3 members</option>
//         <option value="4-5">4-5 members</option>
//         <option value="6+">6+ members</option>
//         <option value="No preference">No preference</option>
//       </select>
//     </div>

//     <div>
//       <Label className="text-white mb-2 block">Experience Level</Label>
//       <select
//         className="input-dark w-full"
//         name="experience_level"
//         value={formData.experience_level}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//       >
//         <option value="">Select</option>
//         <option value="Beginner">Beginner (0-1 years)</option>
//         <option value="Intermediate">Intermediate (2-4 years)</option>
//         <option value="Advanced">Advanced (5+ years)</option>
//       </select>
//     </div>

//     <div>
//       <Label className="text-white mb-2 block">Hackathon Types</Label>
//       <select
//         className="input-dark w-full"
//         name="hackathon_type"
//         value={formData.hackathon_type}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//       >
//         <option value="">Select</option>
//         <option value="In-person">In-person events</option>
//         <option value="Virtual">Virtual events</option>
//         <option value="Both">Both</option>
//       </select>
//     </div>

//     <div>
//       <Label className="text-white mb-2 block">Availability</Label>
//       <select
//         className="input-dark w-full"
//         name="availability"
//         value={formData.availability}
//         onChange={handleInputChange}
//         disabled={!isEditing}
//       >
//         <option value="">Select</option>
//         <option value="Weekends only">Weekends only</option>
//         <option value="Weekdays">Weekdays</option>
//         <option value="Both">Both</option>
//       </select>
//     </div>
//   </div>
// </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import { supabase } from "@/integrations/supabase/client";
import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Mail,
  MapPin,
  GraduationCap,
  Upload,
  X,
  Plus,
  Save,
  Camera,
  FileText,
  Linkedin
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, profile, updateProfile, uploadAvatar, uploadResume } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    linkedin_url: profile?.linkedin_url || '', // Added LinkedIn URL field
    college: profile?.college || '',
    city: profile?.city || '',
    state: profile?.state || '',
    bio: profile?.bio || '',
    skills: profile?.skills || [],
    team_size_pref: profile?.team_size_pref || '',
    experience_level: profile?.experience_level || '',
    hackathon_type: profile?.hackathon_type || '',
    availability: profile?.availability || ''
  });

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);


  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        full_name: formData.full_name,
        email: formData.email,
        linkedin_url: formData.linkedin_url, // Pass LinkedIn URL to updateProfile
        college: formData.college,
        city: formData.city,
        state: formData.state,
        bio: formData.bio,
        skills: formData.skills,
        team_size_pref: formData.team_size_pref,
        experience_level: formData.experience_level,
        hackathon_type: formData.hackathon_type,
        availability: formData.availability,
      });

      // Call the summary API, but handle errors separately
      try {
        const response = await fetch(`http://127.0.0.1:8000/generate-summary/${user.id}`);
        if (!response.ok) {
          // Optionally, show a warning toast if summary fails, but don't treat as fatal
          toast({
            title: "Profile updated",
            description: "Profile updated, but summary generation failed.",
            variant: "warning",
          });
          setIsEditing(false);
          return;
        }
      } catch (summaryError) {
        // Optionally, show a different toast if fetch itself fails
        toast({
          title: "Profile updated",
          description: "Profile updated, but summary generation failed (network error).",
          variant: "warning",
        });
        setIsEditing(false);
        return;
      }

      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };


  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadAvatar(file);
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await uploadResume(file);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been successfully uploaded.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const skillSuggestions = [
    'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript', 'MongoDB', 'PostgreSQL',
    'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Data Science',
    'UI/UX Design', 'Figma', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'Vue.js',
    'Angular', 'Django', 'Flask', 'Express.js', 'Go', 'Rust', 'Java', 'C++', 'PHP'
  ];


  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Your Profile
            </h1>
            <p className="text-gray-400">
              {isEditing ? 'Edit your information to get better teammate matches' : 'Manage your profile and preferences'}
            </p>
          </div>

          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={isEditing ? "btn-electric" : "btn-ghost"}
            disabled={isUploading}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <User className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-2xl">
              {/* Profile Picture */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 bg-electric-gradient rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 overflow-hidden">
                    {profile.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      profile.full_name?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  {isEditing && (
                    <>
                      <button
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={isUploading}
                        className="absolute bottom-2 right-2 w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center hover:bg-electric-teal transition-colors disabled:opacity-50"
                      >
                        <Camera className="w-5 h-5 text-white" />
                      </button>
                      <input
                        ref={avatarInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white">{profile.full_name}</h2>
                <p className="text-gray-400">{profile.email}</p>
                <div className="mt-2 flex items-center justify-center text-electric-blue">
                  <span className="text-sm font-medium">{profile.credits} credits</span>
                </div>
              </div>

              {/* Resume Upload */}
              <div
                onClick={() => resumeInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-electric-blue/50 transition-colors cursor-pointer"
              >
                {profile.resume_url ? (
                  <>
                    <FileText className="w-8 h-8 text-electric-blue mx-auto mb-2" />
                    <p className="text-electric-blue text-sm mb-2">
                      {profile.resume_filename || 'Resume uploaded'}
                    </p>
                    <p className="text-xs text-gray-500">
                      Click to update resume
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm mb-2">
                      Upload Resume
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF (Max 10MB)
                    </p>
                  </>
                )}
              </div>
              <input
                ref={resumeInputRef}
                type="file"
                accept="application/pdf"
                onChange={handleResumeUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white mb-2 block">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      className="input-dark pl-11"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="input-dark pl-11"
                      readOnly // Email field is now read-only
                    />
                  </div>
                </div>

                {/* New LinkedIn URL field */}
                <div>
                  <Label className="text-white mb-2 block">LinkedIn URL</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={handleInputChange}
                      className="input-dark pl-11"
                      placeholder="Your LinkedIn profile URL"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">College/University</Label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="input-dark pl-11"
                      placeholder="Enter your college/university"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Location</Label>
                  <div className="flex space-x-3">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="input-dark pl-11"
                        placeholder="City"
                        disabled={!isEditing}
                      />
                    </div>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input-dark flex-1"
                      placeholder="State"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Label className="text-white mb-2 block">Bio</Label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="input-dark min-h-[100px]"
                  placeholder="Tell us about yourself, your interests, and what you're looking for in teammates..."
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Skills & Technologies</h3>

              {/* Current Skills */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-electric-blue/20 text-electric-blue px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="ml-2 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {formData.skills.length === 0 && (
                  <p className="text-gray-400 text-sm">No skills added yet. Add your first skill below!</p>
                )}
              </div>

              {/* Add New Skill */}
              {isEditing && (
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="input-dark"
                      placeholder="Add a skill (e.g., React, Python, UI/UX)"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    />
                    <Button
                      onClick={handleAddSkill}
                      className="btn-electric"
                      disabled={!newSkill.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Skill Suggestions */}
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Popular skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {skillSuggestions
                        .filter(skill => !formData.skills.includes(skill))
                        .slice(0, 10)
                        .map((skill, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                skills: [...prev.skills, skill]
                              }));
                            }}
                            className="bg-white/5 hover:bg-electric-blue/20 text-gray-300 hover:text-electric-blue px-3 py-1 rounded-full text-sm transition-colors"
                          >
                            + {skill}
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hackathon Preferences */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-6">Hackathon Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white mb-2 block">Preferred Team Size</Label>
                  <select
                    className="input-dark w-full"
                    name="team_size_pref"
                    value={formData.team_size_pref}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select</option>
                    <option value="2-3">2-3 members</option>
                    <option value="4-5">4-5 members</option>
                    <option value="6+">6+ members</option>
                    <option value="No preference">No preference</option>
                  </select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Experience Level</Label>
                  <select
                    className="input-dark w-full"
                    name="experience_level"
                    value={formData.experience_level}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select</option>
                    <option value="Beginner">Beginner (0-1 years)</option>
                    <option value="Intermediate">Intermediate (2-4 years)</option>
                    <option value="Advanced">Advanced (5+ years)</option>
                  </select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Hackathon Types</Label>
                  <select
                    className="input-dark w-full"
                    name="hackathon_type"
                    value={formData.hackathon_type}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select</option>
                    <option value="In-person">In-person events</option>
                    <option value="Virtual">Virtual events</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div>
                  <Label className="text-white mb-2 block">Availability</Label>
                  <select
                    className="input-dark w-full"
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  >
                    <option value="">Select</option>
                    <option value="Weekends only">Weekends only</option>
                    <option value="Weekdays">Weekdays</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;