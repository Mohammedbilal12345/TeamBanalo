
// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/contexts/AuthContext";
// import { Link } from "react-router-dom";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming these components are available in your setup

// // It's good practice to manage environment variables
// const BASE_URL = "http://127.0.0.1:8000";

// const ExploreAndTeammates: React.FC = () => {
//   const { user } = useAuth();
//   const [hackathons, setHackathons] = useState<any[]>([]);
//   const [projects, setProjects] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [showRecs, setShowRecs] = useState(false);
//   const [recommendations, setRecommendations] = useState<any[]>([]);
//   const [loadingRecs, setLoadingRecs] = useState(false);
//   const [recContext, setRecContext] = useState<any>(null); // can be hackathon or project
//   const [recType, setRecType] = useState<"hackathon" | "project" | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       // Fetch hackathons
//       const { data: hackathonsData, error: hackathonsError } = await supabase
//         .from("hackathons")
//         .select("*")
//         .order("created_at", { ascending: false });
//       if (hackathonsError) {
//         console.error("Error fetching hackathons:", hackathonsError);
//       }
//       setHackathons(hackathonsData || []);

//       // Fetch projects
//       const { data: projectsData, error: projectsError } = await supabase
//         .from("projects")
//         .select("*")
//         .order("created_at", { ascending: false });
//       if (projectsError) {
//         console.error("Error fetching projects:", projectsError);
//       }
//       setProjects(projectsData || []);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   const handleFindTeammates = async (
//     context: any,
//     type: "hackathon" | "project"
//   ) => {
//     setLoadingRecs(true);
//     setShowRecs(true);
//     setRecContext(context);
//     setRecType(type);
//     setRecommendations([]); // Clear previous recommendations
//     try {
//       const response = await fetch(`${BASE_URL}/recommend-team-mates`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           hackathon_id: context.id, // Assuming hackathon_id is used for both types for now
//           poster_id: context.user_id,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
//       }

//       const data = await response.json();
//       const recommendedUserIds = data.recommendations.map((rec: any) => rec.user_id);

//       // Fetch user profiles for recommended IDs
//       const { data: profilesData, error: profilesError } = await supabase
//         .from("profiles")
//         .select("id, full_name, avatar_url")
//         .in("id", recommendedUserIds);

//       let recommendationsWithProfiles = data.recommendations || [];
//       if (profilesError) {
//         console.error("Error fetching profiles for recommendations:", profilesError);
//         // If profiles cannot be fetched, we still show recommendations without profile data
//       } else {
//         recommendationsWithProfiles = recommendationsWithProfiles.map((rec: any) => {
//           const profile = profilesData.find(p => p.id === rec.user_id);
//           return { ...rec, profile };
//         });
//       }
//       setRecommendations(recommendationsWithProfiles);

//     } catch (error) {
//       console.error("Error fetching teammates:", error);
//       alert("Failed to fetch recommendations. Please try again.");
//     } finally {
//       setLoadingRecs(false);
//     }
//   };

//   // Filter hackathons for "My Hackathons" and "Explore Hackathons" sections
//   const myHackathons = user ? hackathons.filter((h) => h.user_id === user.id) : [];
//   const exploreHackathons = user
//     ? hackathons.filter((h) => h.user_id !== user.id)
//     : hackathons;

//   // Handler for the "Connect" button in the modal
//   const handleConnect = (recommendedUser: any) => {
//     alert(`Connecting with ${recommendedUser.profile?.full_name || recommendedUser.email}! (Feature coming soon)`);
//     // Here you would implement logic to initiate a chat, send a connection request, etc.
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10 pt-20">
//       <h1 className="text-3xl font-bold mb-2 text-white">Explore What's New</h1>
//       <p className="mb-8 text-gray-300">
//         Find hackathons and projects to join, or just see what others are working on.
//       </p>

//       {/* ========== My Hackathons Section ========== */}
//       {user && (
//         <>
//           <h2 className="text-2xl font-bold mb-4 text-white">My Hackathons</h2>
//           {loading ? (
//             <div className="mb-8 text-gray-400">Loading your hackathons...</div>
//           ) : myHackathons.length === 0 ? (
//             <div className="mb-8 text-gray-400">
//               You haven't posted any hackathons yet.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
//               {myHackathons.map((h) => (
//                 <div
//                   key={h.id}
//                   className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col relative overflow-hidden group"
//                 >
//                   {/* Background gradient effect on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-electric-teal/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
//                   <div className="relative z-10 flex flex-col h-full">
//                     <div className="mb-6">
//                       <h3 className="text-xl font-bold text-gray-100 mb-1">
//                         {h.hackathon_name}
//                       </h3>
//                       <div className="text-gray-400 text-sm">
//                         {h.location} • {h.date}
//                       </div>
//                     </div>
//                     <p className="text-gray-400 mb-4 flex-grow">{h.project_description}</p>
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {h.skills_needed?.map((skill: string) => (
//                         <span
//                           key={skill}
//                           className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                     <div className="flex items-center gap-2 mt-auto">
//                       <Button variant="secondary" onClick={() => handleFindTeammates(h, "hackathon")}>
//                         Find Team Mates
//                       </Button>
//                       <Link
//                         to={`/hackathon/${h.id}`}
//                         className="text-electric-blue font-semibold hover:underline"
//                       >
//                         View Details
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </>
//       )}

//       {/* ========== Explore Hackathons Section ========== */}
//       <h2 className="text-2xl font-bold mb-4 text-white">Explore Hackathons</h2>
//       {loading ? (
//         <div className="mb-8 text-gray-400">Loading hackathons...</div>
//       ) : exploreHackathons.length === 0 ? (
//         <div className="mb-8 text-gray-400">No hackathons to explore right now.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
//           {exploreHackathons.map((h) => (
//             <div
//               key={h.id}
//               className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col relative overflow-hidden group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-electric-teal/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
//               <div className="relative z-10 flex flex-col h-full">
//                 <div className="mb-6">
//                   <h3 className="text-xl font-bold text-gray-100 mb-1">
//                     {h.hackathon_name}
//                   </h3>
//                   <div className="text-gray-400 text-sm">
//                     {h.location} • {h.date}
//                   </div>
//                 </div>
//                 <p className="text-gray-400 mb-4 flex-grow">{h.project_description}</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {h.skills_needed?.map((skill: string) => (
//                     <span
//                       key={skill}
//                       className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex items-center gap-2 mt-auto">
//                   <Button variant="secondary" onClick={() => handleFindTeammates(h, "hackathon")}>
//                     Find Team Mates
//                   </Button>
//                   <Link
//                     to={`/hackathon/${h.id}`}
//                     className="text-electric-blue font-semibold hover:underline"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ========== Explore Projects Section ========== */}
//       <h2 className="text-2xl font-bold mb-4 text-white">Explore Projects</h2>
//       {loading ? (
//         <div className="text-gray-400">Loading projects...</div>
//       ) : projects.length === 0 ? (
//         <div className="text-gray-400">No projects to explore right now.</div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {projects.map((p) => (
//             <div
//               key={p.id}
//               className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col relative overflow-hidden group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-electric-teal/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
//               <div className="relative z-10 flex flex-col h-full">
//                 <div className="mb-6">
//                   <h3 className="text-xl font-bold text-gray-100 mb-1">
//                     {p.project_name}
//                   </h3>
//                   <div className="text-gray-400 text-sm">
//                     {new Date(p.created_at).toLocaleDateString()}
//                   </div>
//                 </div>
//                 <p className="text-gray-400 mb-4 flex-grow">{p.project_description}</p>
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {p.required_skills?.map((skill: string) => (
//                     <span
//                       key={skill}
//                       className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded text-xs"
//                     >
//                       {skill}
//                     </span>
//                   ))}
//                 </div>
//                 <div className="flex items-center gap-2 mt-auto">
//                   <Link
//                     to={`/project/${p.id}`}
//                     className="text-electric-blue font-semibold hover:underline"
//                   >
//                     View Details
//                   </Link>
//                   <Button variant="secondary" onClick={() => handleFindTeammates(p, "project")}>
//                     Find Team Mates
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ========== Recommendations Modal ========== */}
//       {showRecs && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
//           <div className="bg-gradient-to-br from-dark-300 to-dark-400 p-6 rounded-2xl max-w-2xl w-full relative shadow-2xl border border-electric-blue/20 animate-scale-in">
//             {/* Close button */}
//             <button
//               className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
//               onClick={() => setShowRecs(false)}
//               aria-label="Close recommendations"
//             >
//               &times;
//             </button>
//             <h2 className="text-2xl font-bold text-white mb-6 text-center">
//               Recommended Teammates for{" "}
//               <span className="text-electric-blue">
//                 {recContext?.hackathon_name || recContext?.project_name}
//               </span>
//             </h2>
//             {loadingRecs ? (
//               <p className="text-gray-400 text-center py-8">Finding best teammates for you...</p>
//             ) : recommendations.length === 0 ? (
//               <p className="text-gray-400 text-center py-8">No recommendations found at the moment. Try updating your profile or searching for other opportunities!</p>
//             ) : (
//               <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
//                 {recommendations.map((rec) => (
//                   <li
//                     key={rec.user_id}
//                     className="bg-dark-400/50 backdrop-blur-sm p-4 rounded-xl flex items-center space-x-4 border border-dark-500 hover:border-electric-blue/50 transition-all duration-300 ease-in-out transform hover:scale-[1.02] shadow-md"
//                   >
//                     {/* User Avatar */}
//                     <Avatar className="w-16 h-16 flex-shrink-0">
//                       <AvatarImage src={rec.profile?.avatar_url || "https://placehold.co/64x64/292524/A1A1AA?text=U"} alt={rec.profile?.full_name || "User"} />
//                       <AvatarFallback className="bg-electric-blue/30 text-electric-blue text-lg font-bold">
//                         {rec.profile?.full_name?.charAt(0).toUpperCase() || rec.email?.charAt(0).toUpperCase() || 'U'}
//                       </AvatarFallback>
//                     </Avatar>

//                     {/* User Details */}
//                     <div className="flex-1 min-w-0">
//                       <p className="text-white font-semibold text-lg truncate">
//                         {rec.profile?.full_name || rec.email}
//                       </p>
//                       <p className="text-gray-400 text-sm mt-1 line-clamp-2">
//                         {rec.explanation}
//                       </p>
//                     </div>

//                     {/* Score Badge and Actions */}
//                     <div className="flex flex-col items-end space-y-2 flex-shrink-0">
//                       <span className="bg-gradient-to-r from-electric-blue to-electric-teal text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg animate-bounce-in-score">
//                         {Math.round(rec.score)}% Match
//                       </span>
//                       <Link to={`/view-profile/${rec.user_id}`} className="btn-ghost-small text-electric-blue hover:text-electric-teal transition-colors">
//                         View Profile
//                       </Link>
//                       <Button
//                         variant="secondary"
//                         size="sm"
//                         onClick={() => handleConnect(rec)}
//                         className="btn-electric-small"
//                       >
//                         Connect
//                       </Button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExploreAndTeammates;

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming these components are available in your setup

// It's good practice to manage environment variables
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
      // Fetch hackathons
      const { data: hackathonsData, error: hackathonsError } = await supabase
        .from("hackathons")
        .select("*")
        .order("created_at", { ascending: false });
      if (hackathonsError) {
        console.error("Error fetching hackathons:", hackathonsError);
      }
      setHackathons(hackathonsData || []);

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (projectsError) {
        console.error("Error fetching projects:", projectsError);
      }
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
    setRecommendations([]); // Clear previous recommendations
    try {
      const response = await fetch(`${BASE_URL}/recommend-team-mates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hackathon_id: context.id, // Assuming hackathon_id is used for both types for now
          poster_id: context.user_id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
      }

      const data = await response.json();
      const recommendedUserIds = data.recommendations.map((rec: any) => rec.user_id);

      // Fetch user profiles for recommended IDs
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url")
        .in("id", recommendedUserIds);

      let recommendationsWithProfiles = data.recommendations || [];
      if (profilesError) {
        console.error("Error fetching profiles for recommendations:", profilesError);
        // If profiles cannot be fetched, we still show recommendations without profile data
      } else {
        recommendationsWithProfiles = recommendationsWithProfiles.map((rec: any) => {
          const profile = profilesData.find(p => p.id === rec.user_id);
          return { ...rec, profile };
        });
      }
      setRecommendations(recommendationsWithProfiles);

    } catch (error) {
      console.error("Error fetching teammates:", error);
      alert("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoadingRecs(false);
    }
  };

  // Filter hackathons for "My Hackathons" and "Explore Hackathons" sections
  const myHackathons = user ? hackathons.filter((h) => h.user_id === user.id) : [];
  const exploreHackathons = user
    ? hackathons.filter((h) => h.user_id !== user.id)
    : hackathons;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-20">
      <h1 className="text-3xl font-bold mb-2 text-white">Explore What's New</h1>
      <p className="mb-8 text-gray-300">
        Find hackathons and projects to join, or just see what others are working on.
      </p>

      {/* ========== My Hackathons Section ========== */}
      {user && (
        <>
          <h2 className="text-2xl font-bold mb-4 text-white">My Hackathons</h2>
          {loading ? (
            <div className="mb-8 text-gray-400">Loading your hackathons...</div>
          ) : myHackathons.length === 0 ? (
            <div className="mb-8 text-gray-400">
              You haven't posted any hackathons yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
              {myHackathons.map((h) => (
                <div
                  key={h.id}
                  className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col relative overflow-hidden group"
                >
                  {/* Background gradient effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-electric-teal/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-100 mb-1">
                        {h.hackathon_name}
                      </h3>
                      <div className="text-gray-400 text-sm">
                        {h.location} • {h.date}
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4 flex-grow">{h.project_description}</p>
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
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ========== Explore Hackathons Section ========== */}
      <h2 className="text-2xl font-bold mb-4 text-white">Explore Hackathons</h2>
      {loading ? (
        <div className="mb-8 text-gray-400">Loading hackathons...</div>
      ) : exploreHackathons.length === 0 ? (
        <div className="mb-8 text-gray-400">No hackathons to explore right now.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {exploreHackathons.map((h) => (
            <div
              key={h.id}
              className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-electric-teal/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-1">
                    {h.hackathon_name}
                  </h3>
                  <div className="text-gray-400 text-sm">
                    {h.location} • {h.date}
                  </div>
                </div>
                <p className="text-gray-400 mb-4 flex-grow">{h.project_description}</p>
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
            </div>
          ))}
        </div>
      )}

      {/* ========== Explore Projects Section ========== */}
      <h2 className="text-2xl font-bold mb-4 text-white">Explore Projects</h2>
      {loading ? (
        <div className="text-gray-400">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-gray-400">No projects to explore right now.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-dark-300/40 p-6 rounded-2xl hover:scale-105 transition-all flex flex-col relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-electric-blue/10 to-electric-teal/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-1">
                    {p.project_name}
                  </h3>
                  <div className="text-gray-400 text-sm">
                    {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray-400 mb-4 flex-grow">{p.project_description}</p>
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
            </div>
          ))}
        </div>
      )}

      {/* ========== Recommendations Modal ========== */}
      {showRecs && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="bg-gradient-to-br from-dark-300 to-dark-400 p-6 rounded-2xl max-w-4xl w-full relative shadow-2xl border border-electric-blue/20 animate-scale-in">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl"
              onClick={() => setShowRecs(false)}
              aria-label="Close recommendations"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Recommended Teammates for{" "}
              <span className="text-electric-blue">
                {recContext?.hackathon_name || recContext?.project_name}
              </span>
            </h2>
            {loadingRecs ? (
              <p className="text-gray-400 text-center py-8">Finding best teammates for you...</p>
            ) : recommendations.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No recommendations found at the moment. Try updating your profile or searching for other opportunities!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
<<<<<<< HEAD
                {recommendations
                // .filter((rec) => rec.profile || rec.email) // Ensure we have at least email or profile
                .filter((rec) => rec.score > 0) // Only show recommendations with a score greater than 0
                .map((rec) => (
=======
                {recommendations.map((rec) => (
>>>>>>> c7f4d95972f671819ac339c8c1c82eaee52a516d
                  <div
                    key={rec.user_id}
                    className="bg-dark-400/50 backdrop-blur-sm p-5 rounded-xl flex flex-col items-center text-center space-y-3 border border-dark-500 hover:border-electric-blue/50 transition-all duration-300 ease-in-out transform hover:scale-[1.03] shadow-md"
                  >
                    {/* User Avatar */}
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={rec.profile?.avatar_url || "https://placehold.co/80x80/292524/A1A1AA?text=U"} alt={rec.profile?.full_name || "User"} />
                      <AvatarFallback className="bg-electric-blue/30 text-electric-blue text-2xl font-bold">
                        {rec.profile?.full_name?.charAt(0).toUpperCase() || rec.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>

                    {/* User Details */}
                    <div className="flex-1 min-w-0 w-full">
                      <p className="text-white font-semibold text-xl truncate mb-1">
                        {rec.profile?.full_name || rec.email}
                      </p>
                      <p className="text-gray-400 text-sm line-clamp-3 mb-3">
                        {rec.explanation}
                      </p>
                    </div>

                    {/* Score Badge and Actions */}
                    <div className="flex flex-col items-center space-y-2 w-full">
                      <span className="bg-gradient-to-r from-electric-blue to-electric-teal text-white px-5 py-2 rounded-full text-base font-bold shadow-lg animate-bounce-in-score">
                        {Math.round(rec.score)}% Match
                      </span>
                      <Link to={`/view-profile/${rec.user_id}`} className="w-full">
                        <Button variant="secondary" className="w-full text-electric-blue hover:text-electric-teal transition-colors">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreAndTeammates;