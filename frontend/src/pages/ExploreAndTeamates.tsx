// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/contexts/AuthContext";
// import { Link } from "react-router-dom";

// const BASE_URL = "http://127.0.0.1:8000";

// const ExploreAndTeammates: React.FC = () => {
//   const { user } = useAuth();
//   const [hackathons, setHackathons] = useState<any[]>([]);
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showRecs, setShowRecs] = useState(false);
//   const [recommendations, setRecommendations] = useState<any[]>([]);
//   const [loadingRecs, setLoadingRecs] = useState(false);
//   const [recHackathon, setRecHackathon] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const { data: hackathonsData } = await supabase
//         .from("hackathons")
//         .select("*")
//         .order("created_at", { ascending: false });
//       setHackathons(hackathonsData || []);

//       const { data: projectsData } = await supabase
//         .from("projects")
//         .select("*")
//         .order("created_at", { ascending: false });
//       setProjects(projectsData || []);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const handleFindTeammates = async (hackathon: any) => {
//     setLoadingRecs(true);
//     setShowRecs(true);
//     setRecHackathon(hackathon);
//     setRecommendations([]);
//     try {
//       const response = await fetch(`${BASE_URL}/recommend-team-mates`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hackathon_id: hackathon.id, poster_id: hackathon.user_id }),
//       });
//       if (!response.ok) throw new Error("Failed to fetch recommendations.");
//       const data = await response.json();
//       setRecommendations(data.recommendations || []);
//     } catch (error) {
//       console.error("Error fetching teammates:", error);
//       alert("Failed to fetch recommendations. Please try again.");
//     } finally {
//       setLoadingRecs(false);
//     }
//   };

//   const myHackathons = user ? hackathons.filter(h => h.user_id === user.id) : [];
//   const exploreHackathons = user ? hackathons.filter(h => h.user_id !== user.id) : hackathons;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 pt-20">
//       <h1 className="text-3xl font-bold mb-2">Explore What's New</h1>
//       <p className="mb-8 text-gray-300">Find hackathons and projects to join, or just see what others are working on.</p>

//       {user && (
//         <>
//           <h2 className="text-2xl font-bold mb-4">My Hackathons</h2>
//           {loading ? (
//             <div className="mb-8 text-gray-400">Loading...</div>
//           ) : myHackathons.length === 0 ? (
//             <div className="mb-8 text-gray-400">You haven't posted any hackathons yet.</div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
//               {myHackathons.map((h) => (
//                 <HackathonCard key={h.id} hackathon={h} onFindTeam={() => handleFindTeammates(h)} />
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       <h2 className="text-2xl font-bold mb-4">Explore Hackathons</h2>
//       {loading ? (
//         <div className="mb-8 text-gray-400">Loading...</div>
//       ) : exploreHackathons.length === 0 ? (
//         <div className="mb-8 text-gray-400">No hackathons to explore right now.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
//           {exploreHackathons.map((h) => (
//             <HackathonCard key={h.id} hackathon={h} onFindTeam={() => handleFindTeammates(h)} />
//           ))}
//         </div>
//       )}

//       <h2 className="text-2xl font-bold mb-4">Explore Projects</h2>
//       {loading ? (
//         <div className="text-gray-400">Loading...</div>
//       ) : projects.length === 0 ? (
//         <div className="text-gray-400">No projects to explore right now.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {projects.map((p) => (
//             <div key={p.id} className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col relative z-10">
//               <div className="mb-6">
//                 <h3 className="text-xl font-bold text-gray-100 mb-1">{p.project_name}</h3>
//                 <div className="text-gray-400 text-sm">{new Date(p.created_at).toLocaleDateString()}</div>
//               </div>
//               <p className="text-gray-400 mb-4">{p.project_description}</p>
//               <div className="flex flex-wrap gap-2 mb-4">
//                 {p.required_skills?.map((skill: string) => (
//                   <span key={skill} className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs">{skill}</span>
//                 ))}
//               </div>
//               <div className="flex items-center gap-2 mt-auto z-10 relative">
//                 <Link to={`/project/${p.id}`} className="text-electric-blue font-semibold hover:underline">View Details</Link>
//                 <Button variant="secondary" onClick={() => alert("Find Teams feature coming soon!")}>Find Teams</Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {showRecs && (
//         <RecommendationModal
//           hackathon={recHackathon}
//           recommendations={recommendations}
//           loading={loadingRecs}
//           onClose={() => setShowRecs(false)}
//         />
//       )}
//     </div>
//   );
// };

// const HackathonCard = ({ hackathon, onFindTeam }: any) => (
//   <div className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col relative z-10">
//     <div className="mb-6">
//       <h3 className="text-xl font-bold text-gray-100 mb-1">{hackathon.hackathon_name}</h3>
//       <div className="text-gray-400 text-sm">{hackathon.location} • {hackathon.date}</div>
//     </div>
//     <p className="text-gray-400 mb-4">{hackathon.project_description}</p>
//     <div className="flex flex-wrap gap-2 mb-4">
//       {hackathon.skills_needed?.map((skill: string) => (
//         <span key={skill} className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs">{skill}</span>
//       ))}
//     </div>
//     <div className="flex items-center gap-2 mt-auto z-10 relative">
//       <Button variant="secondary" onClick={onFindTeam}>Find Team Mates</Button>
//       <Link to={`/hackathon/${hackathon.id}`} className="text-electric-blue font-semibold hover:underline">View Details</Link>
//     </div>
//   </div>
// );

// const RecommendationModal = ({ hackathon, recommendations, loading, onClose }: any) => (
//   <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center px-4">
//     <div className="bg-zinc-900 w-full max-w-2xl p-6 rounded-xl relative shadow-lg">
//       <button onClick={onClose} className="absolute top-3 right-4 text-gray-400 hover:text-white text-xl">✕</button>
//       <h2 className="text-xl font-bold mb-4 text-electric-blue">
//         Recommended Teammates for "{hackathon?.hackathon_name}"
//       </h2>
//       {loading ? (
//         <p className="text-gray-400">Finding best teammates...</p>
//       ) : recommendations.length === 0 ? (
//         <p className="text-gray-400">No recommendations found.</p>
//       ) : (
//         <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
//           {recommendations.map((rec) => (
//             <li key={rec.user_id} className="bg-zinc-800 p-4 rounded-lg border border-zinc-700">
//               <div className="font-semibold text-white">{rec.email}</div>
//               <div className="text-sm text-blue-400">Score: {rec.score}% match</div>
//               <div className="text-sm text-gray-400 italic mt-1">{rec.explanation}</div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   </div>
// );

// export default ExploreAndTeammates;




import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

// ✅ RECOMMENDED: Store in .env (use VITE_ prefix if using Vite)
const BASE_URL = "http://127.0.0.1:8000";

const ExploreAndTeammates: React.FC = () => {
  const { user } = useAuth();
  const [hackathons, setHackathons] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showRecs, setShowRecs] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [recContext, setRecContext] = useState<any>(null); // can be hackathon or project
  const [recType, setRecType] = useState<"hackathon" | "project" | null>(null);

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

  const handleFindTeammates = async (
    context: any,
    type: "hackathon" | "project"
  ) => {
    setLoadingRecs(true);
    setShowRecs(true);
    setRecContext(context);
    setRecType(type);
    setRecommendations([]);
    try {
      const response = await fetch(`${BASE_URL}/recommend-team-mates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hackathon_id: context.id,
          poster_id: context.user_id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations.");
      }

      const data = await response.json();
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error("Error fetching teammates:", error);
      alert("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoadingRecs(false);
    }
  };

  const myHackathons = user ? hackathons.filter((h) => h.user_id === user.id) : [];
  const exploreHackathons = user
    ? hackathons.filter((h) => h.user_id !== user.id)
    : hackathons;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-20">
      <h1 className="text-3xl font-bold mb-2">Explore What's New</h1>
      <p className="mb-8 text-gray-300">
        Find hackathons and projects to join, or just see what others are working on.
      </p>

      {/* ========== My Hackathons ========== */}
      {user && (
        <>
          <h2 className="text-2xl font-bold mb-4">My Hackathons</h2>
          {loading ? (
            <div className="mb-8 text-gray-400">Loading...</div>
          ) : myHackathons.length === 0 ? (
            <div className="mb-8 text-gray-400">
              You haven't posted any hackathons yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
              {myHackathons.map((h) => (
                <div
                  key={h.id}
                  className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col"
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-100 mb-1">
                      {h.hackathon_name}
                    </h3>
                    <div className="text-gray-400 text-sm">
                      {h.location} • {h.date}
                    </div>
                  </div>
                  <p className="text-gray-400 mb-4">{h.project_description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {h.skills_needed?.map((skill: string) => (
                      <span
                        key={skill}
                        className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-auto">
                    <Button variant="secondary" onClick={() => handleFindTeammates(h, "hackathon")}>
                      Find Team Mates
                    </Button>
                    <Link
                      to={`/hackathon/${h.id}`}
                      className="text-electric-blue font-semibold hover:underline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ========== Explore Hackathons ========== */}
      <h2 className="text-2xl font-bold mb-4">Explore Hackathons</h2>
      {loading ? (
        <div className="mb-8 text-gray-400">Loading...</div>
      ) : exploreHackathons.length === 0 ? (
        <div className="mb-8 text-gray-400">No hackathons to explore right now.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {exploreHackathons.map((h) => (
            <div
              key={h.id}
              className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-100 mb-1">
                  {h.hackathon_name}
                </h3>
                <div className="text-gray-400 text-sm">
                  {h.location} • {h.date}
                </div>
              </div>
              <p className="text-gray-400 mb-4">{h.project_description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {h.skills_needed?.map((skill: string) => (
                  <span
                    key={skill}
                    className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <Button variant="secondary" onClick={() => handleFindTeammates(h, "hackathon")}>
                  Find Team Mates
                </Button>
                <Link
                  to={`/hackathon/${h.id}`}
                  className="text-electric-blue font-semibold hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========== Explore Projects ========== */}
      <h2 className="text-2xl font-bold mb-4">Explore Projects</h2>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : projects.length === 0 ? (
        <div className="text-gray-400">No projects to explore right now.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col"
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-100 mb-1">
                  {p.project_name}
                </h3>
                <div className="text-gray-400 text-sm">
                  {new Date(p.created_at).toLocaleDateString()}
                </div>
              </div>
              <p className="text-gray-400 mb-4">{p.project_description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.required_skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-auto">
                <Link
                  to={`/project/${p.id}`}
                  className="text-electric-blue font-semibold hover:underline"
                >
                  View Details
                </Link>
                <Button variant="secondary" onClick={() => handleFindTeammates(p, "project")}>
                  Find Team Mates
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========== Recommendations Modal ========== */}
      {showRecs && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-dark-200 p-6 rounded-xl max-w-lg w-full relative">
            <button
              className="absolute top-2 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowRecs(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-white mb-4">
              {recType === "hackathon" ? "Hackathon" : "Project"} Recommendations:{" "}
              <span className="text-electric-blue">
                {recContext?.hackathon_name || recContext?.project_name}
              </span>
            </h2>
            {loadingRecs ? (
              <p className="text-gray-400">Finding best teammates...</p>
            ) : recommendations.length === 0 ? (
              <p className="text-gray-400">No recommendations found.</p>
            ) : (
              <ul className="space-y-3 max-h-[300px] overflow-y-auto">
                {recommendations.map((rec) => (
                  <li key={rec.user_id} className="bg-dark-300/30 p-4 rounded-lg">
                    <p className="text-white font-medium">Email: {rec.email}</p>
                    <p className="text-gray-400">Score: {rec.score}</p>
                    <p className="text-sm italic text-gray-500 mt-1">{rec.explanation}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreAndTeammates;
