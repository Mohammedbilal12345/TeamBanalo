import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Camera, Github, Linkedin, Mail, MapPin,
  Upload, Plus, X, Save, GraduationCap, User
} from "lucide-react";

const skillSuggestions = ["React", "Python", "UI/UX", "Node.js", "Docker", "C++", "TypeScript", "Django", "Figma"];

const Profile: React.FC = () => {
  const { user, profile, updateProfile, uploadAvatar, uploadResume } = useAuth();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [newSkill, setNewSkill] = useState("");

  const [formData, setFormData] = useState({
    full_name: "",
    college: "",
    city: "",
    state: "",
    bio: "",
    skills: [],
    github_url: "",
    linkedin_url: "",
    resume_url: "",
    team_size_pref: "",
    experience_level: "",
    hackathon_type: "",
    availability: "",
  });

  // Preload profile into state
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        college: profile.college || "",
        city: profile.city || "",
        state: profile.state || "",
        bio: profile.bio || "",
        skills: profile.skills || [],
        github_url: profile.github_url || "",
        linkedin_url: profile.linkedin_url || "",
        resume_url: profile.resume_url || "",
        team_size_pref: profile.team_size_pref || "",
        experience_level: profile.experience_level || "",
        hackathon_type: profile.hackathon_type || "",
        availability: profile.availability || "",
      });
    }
  }, [profile]);

  // === Handlers ===

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      await uploadAvatar(file);
      toast({ title: "Avatar updated" });
    } catch {
      toast({ title: "Error", description: "Failed to upload avatar", variant: "destructive" });
    }
    setIsUploading(false);
  };

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const { url } = await uploadResume(file);
      setFormData((prev) => ({ ...prev, resume_url: url }));
      toast({ title: "Resume uploaded" });
    } catch {
      toast({ title: "Error", description: "Resume upload failed", variant: "destructive" });
    }
    setIsUploading(false);
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile({ ...formData, resume_url: formData.resume_url });
      toast({ title: "Profile updated" });
      setIsEditing(false);
    } catch {
      toast({ title: "Error", description: "Update failed", variant: "destructive" });
    }
  };

  if (!user || !profile) {
    return <div className="text-white text-center py-40">Loading...</div>;
  }

  // === UI ===
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-100 to-dark-200 pt-20 pb-20 px-4">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-white">Your Profile</h1>
            <p className="text-gray-400">
              {isEditing ? "Edit your details" : "Manage your profile"}
            </p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className={isEditing ? "btn-electric" : "btn-ghost"}
          >
            {isEditing ? <><Save className="w-4 h-4 mr-2" />Save</> : <>Edit Profile</>}
          </Button>
        </div>

        {/* Avatar & Resume */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Avatar */}
          <div className="glass-card p-6 rounded-2xl text-center space-y-4">
            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-electric-gradient">
              <img
                src={profile.avatar_url || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"}
                className="object-cover w-full h-full"
                alt="avatar"
              />
              {isEditing && (
                <>
                  <button
                    onClick={() => avatarInputRef.current?.click()}
                    disabled={isUploading}
                    className="absolute bottom-0 right-0 w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                </>
              )}
            </div>
            <h2 className="text-xl font-bold text-white">{formData.full_name}</h2>
            <p className="text-gray-400">{user.email}</p>
          </div>

          {/* Resume Upload */}
          <div className="glass-card p-6 rounded-2xl space-y-4 lg:col-span-2">
            <Label className="text-white text-sm font-semibold">Resume</Label>
            {formData.resume_url ? (
              <div className="flex items-center justify-between bg-dark-200 px-4 py-2 rounded-md border border-white/10">
                <span className="text-white truncate w-64">
                  {formData.resume_url.split("/").pop()}
                </span>
                <a href={formData.resume_url} target="_blank" rel="noopener noreferrer" className="text-sm text-electric-blue hover:underline">
                  View
                </a>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No resume uploaded</p>
            )}
            {isEditing && (
              <>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  ref={resumeInputRef}
                  onChange={handleResumeUpload}
                  className="hidden"
                />
                <Button onClick={() => resumeInputRef.current?.click()} className="btn-electric" disabled={isUploading}>
                  Upload Resume
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <InputGroup label="Full Name" name="full_name" value={formData.full_name} onChange={handleInputChange} disabled={!isEditing} />
            <InputGroup label="College" name="college" value={formData.college} onChange={handleInputChange} disabled={!isEditing} />
            <InputGroup label="City" name="city" value={formData.city} onChange={handleInputChange} disabled={!isEditing} />
            <InputGroup label="State" name="state" value={formData.state} onChange={handleInputChange} disabled={!isEditing} />
          </div>

          <div>
            <Label className="text-white mb-1 block">Bio</Label>
            <Textarea name="bio" value={formData.bio} onChange={handleInputChange} disabled={!isEditing} className="input-dark min-h-[80px]" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InputGroup label="GitHub" name="github_url" value={formData.github_url} onChange={handleInputChange} disabled={!isEditing} />
            <InputGroup label="LinkedIn" name="linkedin_url" value={formData.linkedin_url} onChange={handleInputChange} disabled={!isEditing} />
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <div>
            <Label className="text-white mb-2 block">Skills</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, index) => (
                <span key={index} className="bg-electric-blue/20 text-electric-blue px-3 py-1 rounded-full text-sm flex items-center">
                  {skill}
                  {isEditing && (
                    <button onClick={() => handleRemoveSkill(skill)} className="ml-2 hover:text-red-400">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
            {isEditing && (
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
                  placeholder="Add skill"
                  className="input-dark"
                />
                <Button onClick={handleAddSkill} className="btn-electric" disabled={!newSkill.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Hackathon Preferences */}
        <div className="glass-card p-6 rounded-2xl space-y-6">
          <h3 className="text-lg font-semibold text-white">Hackathon Preferences</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: "Preferred Team Size", name: "team_size_pref", options: ["2-3", "4-5", "6+", "No preference"] },
              { label: "Experience Level", name: "experience_level", options: ["Beginner", "Intermediate", "Advanced"] },
              { label: "Hackathon Type", name: "hackathon_type", options: ["Virtual", "In-person", "Both"] },
              { label: "Availability", name: "availability", options: ["Weekends only", "Weekdays", "Both"] }
            ].map(({ label, name, options }) => (
              <div key={name}>
                <Label className="text-white mb-1">{label}</Label>
                <select name={name} value={formData[name as keyof typeof formData] as string} onChange={handleInputChange} disabled={!isEditing} className="input-dark w-full">
                  <option value="">Select</option>
                  {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Input Group
const InputGroup = ({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div>
    <Label className="text-white mb-1 block">{label}</Label>
    <Input {...rest} className="input-dark" />
  </div>
);

export default Profile;
