// import React, { useState, useEffect } from "react";
// import { Plus } from "lucide-react";

// export default function HomePage() {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");

//   const API_BASE = "https://6852821e0594059b23cdd834.mockapi.io";

//   useEffect(() => {
//     async function fetchFoods() {
//       try {
//         setLoading(true);
//         const res = await fetch(`${API_BASE}/Food`);
//         if (!res.ok) throw new Error("Fetch failed");
//         const data = await res.json();
//         setFoods(data);
//       } catch {
//         setFoods([]);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchFoods();
//   }, []);

//   // Simple filtered list by searchTerm (local filter)
//   const filteredFoods = foods.filter(
//   (food) =>
//     food.food_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     food.restaurant_name.toLowerCase().includes(searchTerm.toLowerCase())
// );
// return (
//     <>
//     <div style={{ padding: 20 }}>
//     <h1>Featured Restaurants</h1>

//       <div style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           placeholder="Search food or restaurants"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ padding: 8, width: "300px", marginRight: 10 }}
//         />
//         <button
//           onClick={() => alert("Add Food clicked")}
//           style={{
//             padding: "8px 16px",
//             backgroundColor: "orange",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//             display: "inline-flex",
//             alignItems: "center",
//             gap: 6,
//           }}
//         >
//           <Plus size={16} />
//           Add Food
//         </button>
//       </div>

//       {loading ? (
//         <p>Loading foods...</p>
//       ) : filteredFoods.length === 0 ? (
//         <p>No food items found</p>
//       ) : (
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
//             gap: 20,
//           }}
//         >
//           {filteredFoods.map((food) => (
//             <div
//               key={food.id}
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: 8,
//                 overflow: "hidden",
//                 boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
//               }}
//             >
//               <img
//                 src={food.food_image || "/food-placeholder.jpg"}
//                 alt={food.food_name}
//                 style={{ width: "100%", height: 150, objectFit: "cover" }}
//               />
//               <div style={{ padding: 10 }}>
//                 <h3 style={{ margin: "8px 0" }}>{food.food_name}</h3>
//                 <p>Rating: {food.food_rating}</p>
//                 <p>Restaurant: {food.restaurant_name}</p>
//                 <p>Price: {food.price}</p>
//                 <p>Status: {food.restaurant_status}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";

export default function HomePage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const API_BASE = "https://6852821e0594059b23cdd834.mockapi.io";

  useEffect(() => {
    async function fetchFoods() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/Food`);
        if (!res.ok) throw new Error("Fetch failed");
        const data = await res.json();
        setFoods(data);
      } catch {
        setFoods([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFoods();
  }, []);

  // Safely filter foods: fallback to empty string if undefined
  const filteredFoods = foods.filter((food) => {
    const foodName = (food.food_name ?? "").toString().toLowerCase();
    const restaurantName = (food.restaurant_name ?? "").toString().toLowerCase();
    const term = searchTerm.toLowerCase();

    return foodName.includes(term) || restaurantName.includes(term);
  });

  return (
    <>
      <div style={{ padding: 20 }}>
        <h1>Featured Restaurants</h1>

        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Search food or restaurants"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: 8, width: "300px", marginRight: 10 }}
          />
          <button
            onClick={() => alert("Add Food clicked")}
            style={{
              padding: "8px 16px",
              backgroundColor: "orange",
              color: "white",
              border: "none",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Plus size={16} />
            Add Food
          </button>
        </div>

        {loading ? (
          <p>Loading foods...</p>
        ) : filteredFoods.length === 0 ? (
          <p>No food items found</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
              gap: 20,
            }}
          >
            {filteredFoods.map((food) => (
              <div
                key={food.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: 8,
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
                }}
              >
                <img
                  src={food.food_image || "/food-placeholder.jpg"}
                  alt={food.food_name || "Food"}
                  style={{ width: "100%", height: 150, objectFit: "cover" }}
                />
                <div style={{ padding: 10 }}>
                  <h3 style={{ margin: "8px 0" }}>{food.food_name || "Unnamed Food"}</h3>
                  <p>Rating: {food.food_rating || "N/A"}</p>
                  <p>Restaurant: {food.restaurant_name || "Unknown"}</p>
                  <p>Price: {food.price || "N/A"}</p>
                  <p>Status: {food.restaurant_status || "Unknown"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

