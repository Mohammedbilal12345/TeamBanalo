import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

const Explore: React.FC = () => {
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: hackathonsData } = await supabase
        .from("hackathons")
        .select("*")
        .order("created_at", { ascending: false });
      setHackathons(hackathonsData || []);
      const { data: projectsData } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      setProjects(projectsData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Explore <span className="gradient-text">What's New</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Find hackathons and projects to join, or just see what others are working on.
        </p>
      </div>

      {/* Hackathons */}
      <h2 className="text-2xl font-bold mb-6 text-white">Explore Hackathons</h2>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {hackathons.map((h) => (
            <div
  key={h.id}
  className={`
    bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 
    p-6 sm:p-8 rounded-2xl transition-all duration-300 
    hover:bg-dark-300/60 hover:border-gray-600/50 
    hover:shadow-2xl hover:scale-105 
    focus-within:ring-2 focus-within:ring-electric-blue/50 
    focus-within:ring-offset-2 focus-within:ring-offset-dark-200
    cursor-pointer
  `}
>
  <div className="mb-6">
    <h3 className="text-xl font-bold text-gray-100 mb-1">{h.hackathon_name}</h3>
    <div className="text-gray-400 text-sm">{h.location} • {h.date}</div>
  </div>
  <p className="text-gray-400 mb-4 leading-relaxed">
    {h.project_description}
  </p>
  <div className="flex flex-wrap gap-2 mb-4">
    {h.skills_needed?.map((skill: string) => (
      <span key={skill} className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs">{skill}</span>
    ))}
  </div>
  <div className="flex items-center text-electric-blue font-semibold cursor-pointer">
    View Details
    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
  </div>
</div>

          ))}
        </div>
      )}

      {/* Projects */}
      <h2 className="text-2xl font-bold mb-6 text-white">Explore Projects</h2>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
           <div
  key={p.id}
  className={`
    bg-dark-300/40 backdrop-blur-sm border border-gray-700/50 
    p-6 sm:p-8 rounded-2xl transition-all duration-300 
    hover:bg-dark-300/60 hover:border-gray-600/50 
    hover:shadow-2xl hover:scale-105 
    focus-within:ring-2 focus-within:ring-electric-blue/50 
    focus-within:ring-offset-2 focus-within:ring-offset-dark-200
    cursor-pointer
  `}
>
  <div className="mb-6">
    <h3 className="text-xl font-bold text-gray-100 mb-1">{p.project_name}</h3>
    <div className="text-gray-400 text-sm">{new Date(p.created_at).toLocaleDateString()}</div>
  </div>
  <p className="text-gray-400 mb-4 leading-relaxed">
    {p.project_description}
  </p>
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
  <div className="flex items-center text-electric-blue font-semibold cursor-pointer mt-4">
    View Details
    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
  </div>
</div>

          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
