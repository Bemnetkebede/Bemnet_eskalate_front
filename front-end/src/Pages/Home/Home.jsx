
// import React, { useState, useEffect } from "react";
// import { Plus } from "lucide-react";
// import FoodModal from "../../Components/food-modal"; // Adjust path if needed

// export default function HomePage() {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);

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

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   // Filter foods safely (handle missing fields)
//   const filteredFoods = foods.filter((food) => {
//     const foodName = (food.food_name ?? "").toLowerCase();
//     const restaurantName = (food.restaurant_name ?? "").toLowerCase();
//     const term = searchTerm.toLowerCase();

//     return foodName.includes(term) || restaurantName.includes(term);
//   });

//   // Handle saving new food from modal
//   const handleSaveFood = (newFood) => {
//     // Assign a unique id if your API does not provide it
//     if (!newFood.id) {
//       newFood.id = Date.now().toString();
//     }
//     setFoods((prevFoods) => [...prevFoods, newFood]);
//     closeModal();
//   };

//   return (
//     <>
//       <div style={{ padding: 20 }}>
//         <h1>Featured Restaurants</h1>

//         <div style={{ marginBottom: 20 }}>
//           <input
//             type="text"
//             placeholder="Search food or restaurants"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ padding: 8, width: "300px", marginRight: 10 }}
//           />
//           <button
//             onClick={openModal}
//             style={{
//               padding: "8px 16px",
//               backgroundColor: "orange",
//               color: "white",
//               border: "none",
//               cursor: "pointer",
//               display: "inline-flex",
//               alignItems: "center",
//               gap: 6,
//             }}
//           >
//             <Plus size={16} />
//             Add Food
//           </button>
//         </div>

//         {loading ? (
//           <p>Loading foods...</p>
//         ) : filteredFoods.length === 0 ? (
//           <p>No food items found</p>
//         ) : (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
//               gap: 20,
//             }}
//           >
//             {filteredFoods.map((food) => (
//               <div
//                 key={food.id}
//                 style={{
//                   border: "1px solid #ccc",
//                   borderRadius: 8,
//                   overflow: "hidden",
//                   boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
//                 }}
//               >
//                 <img
//                   src={food.food_image || "/food-placeholder.jpg"}
//                   alt={food.food_name || "Food"}
//                   style={{ width: "100%", height: 150, objectFit: "cover" }}
//                 />
//                 <div style={{ padding: 10 }}>
//                   <h3 style={{ margin: "8px 0" }}>{food.food_name || "Unnamed Food"}</h3>
//                   <p>Rating: {food.food_rating || "N/A"}</p>
//                   <p>Restaurant: {food.restaurant_name || "Unknown"}</p>
//                   <p>Price: {food.price || "N/A"}</p>
//                   <p>Status: {food.restaurant_status || "Unknown"}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Food Modal */}
//         <FoodModal
//           isOpen={isModalOpen}
//           onClose={closeModal}
//           onSave={handleSaveFood}
//         />
//       </div>
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

  const filteredFoods = foods.filter((food) => {
    const foodName = (food.food_name ?? "").toLowerCase();
    const restaurantName = (food.restaurant_name ?? "").toLowerCase();
    const term = searchTerm.toLowerCase();
    return foodName.includes(term) || restaurantName.includes(term);
  });

  return (
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
  );
}
