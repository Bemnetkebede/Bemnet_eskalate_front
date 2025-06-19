// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { toast } from "@/hooks/use-toast"

// export default function FoodModal({ isOpen, onClose, onSave, food }) {
//   const [formData, setFormData] = useState({
//     food_name: "",
//     food_rating: "",
//     food_image: "",
//     restaurant_name: "",
//     restaurant_logo: "",
//     restaurant_status: "Open Now",
//     price: "",
//   })

//   const [errors, setErrors] = useState({})
//   const [loading, setLoading] = useState(false)

//   const API_BASE = "https://6852821e0594059b23cdd834.mockapi.io"

//   useEffect(() => {
//     if (food) {
//       setFormData({
//         food_name: food.food_name,
//         food_rating: food.food_rating.toString(),
//         food_image: food.food_image,
//         restaurant_name: food.restaurant_name,
//         restaurant_logo: food.restaurant_logo,
//         restaurant_status: food.restaurant_status,
//         price: food.price || "",
//       })
//     } else {
//       setFormData({
//         food_name: "",
//         food_rating: "",
//         food_image: "",
//         restaurant_name: "",
//         restaurant_logo: "",
//         restaurant_status: "Open Now",
//         price: "",
//       })
//     }
//     setErrors({})
//   }, [food, isOpen])

//   const validateForm = () => {
//     const newErrors = {}

//     if (!formData.food_name.trim()) {
//       newErrors.food_name = "Food Name is required"
//     }

//     if (!formData.food_rating.trim()) {
//       newErrors.food_rating = "Food Rating must be a number"
//     } else {
//       const rating = Number.parseFloat(formData.food_rating)
//       if (isNaN(rating) || rating < 0 || rating > 5) {
//         newErrors.food_rating = "Food Rating must be a number between 0 and 5"
//       }
//     }

//     if (!formData.food_image.trim()) {
//       newErrors.food_image = "Food Image URL is required"
//     }

//     if (!formData.restaurant_name.trim()) {
//       newErrors.restaurant_name = "Restaurant Name is required"
//     }

//     if (!formData.restaurant_logo.trim()) {
//       newErrors.restaurant_logo = "Restaurant Logo URL is required"
//     }

//     if (!["Open Now", "Closed"].includes(formData.restaurant_status)) {
//       newErrors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'"
//     }

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     setLoading(true)

//     try {
//       const payload = {
//         food_name: formData.food_name.trim(),
//         food_rating: Number.parseFloat(formData.food_rating),
//         food_image: formData.food_image.trim(),
//         restaurant_name: formData.restaurant_name.trim(),
//         restaurant_logo: formData.restaurant_logo.trim(),
//         restaurant_status: formData.restaurant_status,
//         price: formData.price.trim(),
//       }

//       const url = food ? `${API_BASE}/Food/${food.id}` : `${API_BASE}/Food`
//       const method = food ? "PUT" : "POST"

//       try {
//         const response = await fetch(url, {
//           method,
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         })

//         if (!response.ok) {
//           throw new Error(`Failed to ${food ? "update" : "create"} food`)
//         }

//         const savedFood = await response.json()
//         onSave(savedFood)
//       } catch (apiError) {
//         console.log("API call failed, saving locally")
//         // Create local food object if API fails
//         const newFood = {
//           id: food?.id || Date.now().toString(),
//           ...payload,
//           createdAt: food?.createdAt || new Date().toISOString(),
//         }
//         onSave(newFood)
//       }

//       toast({
//         title: "Success",
//         description: `Food item ${food ? "updated" : "created"} successfully`,
//       })
//     } catch (error) {
//       console.error("Error saving food:", error)
//       toast({
//         title: "Error",
//         description: `Failed to ${food ? "update" : "create"} food item`,
//         variant: "destructive",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: undefined }))
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle className="text-xl font-bold text-orange-600">{food ? "Edit a meal" : "Add a meal"}</DialogTitle>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="food_name" className="text-sm font-medium">
//               Food Name
//             </Label>
//             <Input
//               id="food_name"
//               name="food_name"
//               type="text"
//               placeholder="Enter food name"
//               value={formData.food_name}
//               onChange={(e) => handleInputChange("food_name", e.target.value)}
//               className={errors.food_name ? "border-red-500" : ""}
//             />
//             {errors.food_name && (
//               <p id="food-name-error" className="text-sm text-red-600">
//                 {errors.food_name}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="food_rating" className="text-sm font-medium">
//               Food Rating
//             </Label>
//             <Input
//               id="food_rating"
//               name="food_rating"
//               type="number"
//               min="0"
//               max="5"
//               step="0.1"
//               placeholder="Enter rating (0-5)"
//               value={formData.food_rating}
//               onChange={(e) => handleInputChange("food_rating", e.target.value)}
//               className={errors.food_rating ? "border-red-500" : ""}
//             />
//             {errors.food_rating && (
//               <p id="food-rating-error" className="text-sm text-red-600">
//                 {errors.food_rating}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="price" className="text-sm font-medium">
//               Price
//             </Label>
//             <Input
//               id="price"
//               name="price"
//               type="text"
//               placeholder="Enter price (e.g., $12.99)"
//               value={formData.price}
//               onChange={(e) => handleInputChange("price", e.target.value)}
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="food_image" className="text-sm font-medium">
//               Food Image URL
//             </Label>
//             <Input
//               id="food_image"
//               name="food_image"
//               type="url"
//               placeholder="Enter image URL"
//               value={formData.food_image}
//               onChange={(e) => handleInputChange("food_image", e.target.value)}
//               className={errors.food_image ? "border-red-500" : ""}
//             />
//             {errors.food_image && (
//               <p id="food-image-error" className="text-sm text-red-600">
//                 {errors.food_image}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="restaurant_name" className="text-sm font-medium">
//               Restaurant Name
//             </Label>
//             <Input
//               id="restaurant_name"
//               name="restaurant_name"
//               type="text"
//               placeholder="Enter restaurant name"
//               value={formData.restaurant_name}
//               onChange={(e) => handleInputChange("restaurant_name", e.target.value)}
//               className={errors.restaurant_name ? "border-red-500" : ""}
//             />
//             {errors.restaurant_name && (
//               <p id="restaurant-name-error" className="text-sm text-red-600">
//                 {errors.restaurant_name}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="restaurant_logo" className="text-sm font-medium">
//               Restaurant Logo URL
//             </Label>
//             <Input
//               id="restaurant_logo"
//               name="restaurant_logo"
//               type="url"
//               placeholder="Enter logo URL"
//               value={formData.restaurant_logo}
//               onChange={(e) => handleInputChange("restaurant_logo", e.target.value)}
//               className={errors.restaurant_logo ? "border-red-500" : ""}
//             />
//             {errors.restaurant_logo && (
//               <p id="restaurant-logo-error" className="text-sm text-red-600">
//                 {errors.restaurant_logo}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="restaurant_status" className="text-sm font-medium">
//               Restaurant Status
//             </Label>
//             <Select
//               name="restaurant_status"
//               value={formData.restaurant_status}
//               onValueChange={(value) => handleInputChange("restaurant_status", value)}
//             >
//               <SelectTrigger className={errors.restaurant_status ? "border-red-500" : ""}>
//                 <SelectValue placeholder="Select status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="Open Now">Open Now</SelectItem>
//                 <SelectItem value="Closed">Closed</SelectItem>
//               </SelectContent>
//             </Select>
//             {errors.restaurant_status && (
//               <p id="restaurant-status-error" className="text-sm text-red-600">
//                 {errors.restaurant_status}
//               </p>
//             )}
//           </div>

//           <div className="flex space-x-2 pt-4">
//             <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
//               Cancel
//             </Button>
//             <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={loading}>
//               {loading ? "Saving..." : "Save"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"

export default function FoodModal({ isOpen, onClose, onSave, food }) {
  const [formData, setFormData] = useState({
    food_name: "",
    food_rating: "",
    food_image: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "Open Now",
    price: "",
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const API_BASE = "https://6852821e0594059b23cdd834.mockapi.io"

  useEffect(() => {
    if (food) {
      setFormData({
        food_name: food.food_name,
        food_rating: food.food_rating.toString(),
        food_image: food.food_image,
        restaurant_name: food.restaurant_name,
        restaurant_logo: food.restaurant_logo,
        restaurant_status: food.restaurant_status,
        price: food.price || "",
      })
    } else {
      setFormData({
        food_name: "",
        food_rating: "",
        food_image: "",
        restaurant_name: "",
        restaurant_logo: "",
        restaurant_status: "Open Now",
        price: "",
      })
    }
    setErrors({})
  }, [food, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food Name is required"
    }

    if (!formData.food_rating.trim()) {
      newErrors.food_rating = "Food Rating must be a number"
    } else {
      const rating = Number.parseFloat(formData.food_rating)
      if (isNaN(rating) || rating < 0 || rating > 5) {
        newErrors.food_rating = "Food Rating must be a number between 0 and 5"
      }
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = "Food Image URL is required"
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant Name is required"
    }

    if (!formData.restaurant_logo.trim()) {
      newErrors.restaurant_logo = "Restaurant Logo URL is required"
    }

    if (!["Open Now", "Closed"].includes(formData.restaurant_status)) {
      newErrors.restaurant_status = "Restaurant Status must be 'Open Now' or 'Closed'"
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const payload = {
        food_name: formData.food_name.trim(),
        food_rating: Number.parseFloat(formData.food_rating),
        food_image: formData.food_image.trim(),
        restaurant_name: formData.restaurant_name.trim(),
        restaurant_logo: formData.restaurant_logo.trim(),
        restaurant_status: formData.restaurant_status,
        price: formData.price.trim(),
      }

      const url = food ? `${API_BASE}/Food/${food.id}` : `${API_BASE}/Food`
      const method = food ? "PUT" : "POST"

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error(`Failed to ${food ? "update" : "create"} food`)
        }

        const savedFood = await response.json()
        onSave(savedFood)
      } catch (apiError) {
        console.log("API call failed, saving locally")
        // Create local food object if API fails
        const newFood = {
          id: food?.id || Date.now().toString(),
          ...payload,
          createdAt: food?.createdAt || new Date().toISOString(),
        }
        onSave(newFood)
      }

      toast({
        title: "Success",
        description: `Food item ${food ? "updated" : "created"} successfully`,
      })
    } catch (error) {
      console.error("Error saving food:", error)
      toast({
        title: "Error",
        description: `Failed to ${food ? "update" : "create"} food item`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-600">{food ? "Edit a meal" : "Add a meal"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="food_name" className="text-sm font-medium">
              Food Name
            </Label>
            <Input
              id="food_name"
              name="food_name"
              type="text"
              placeholder="Enter food name"
              value={formData.food_name}
              onChange={(e) => handleInputChange("food_name", e.target.value)}
              className={errors.food_name ? "border-red-500" : ""}
            />
            {errors.food_name && (
              <p id="food-name-error" className="text-sm text-red-600">
                {errors.food_name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="food_rating" className="text-sm font-medium">
              Food Rating
            </Label>
            <Input
              id="food_rating"
              name="food_rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Enter rating (0-5)"
              value={formData.food_rating}
              onChange={(e) => handleInputChange("food_rating", e.target.value)}
              className={errors.food_rating ? "border-red-500" : ""}
            />
            {errors.food_rating && (
              <p id="food-rating-error" className="text-sm text-red-600">
                {errors.food_rating}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              type="text"
              placeholder="Enter price (e.g., $12.99)"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && (
              <p id="price-error" className="text-sm text-red-600">
                {errors.price}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="food_image" className="text-sm font-medium">
              Food Image URL
            </Label>
            <Input
              id="food_image"
              name="food_image"
              type="url"
              placeholder="Enter image URL"
              value={formData.food_image}
              onChange={(e) => handleInputChange("food_image", e.target.value)}
              className={errors.food_image ? "border-red-500" : ""}
            />
            {errors.food_image && (
              <p id="food-image-error" className="text-sm text-red-600">
                {errors.food_image}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurant_name" className="text-sm font-medium">
              Restaurant Name
            </Label>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              type="text"
              placeholder="Enter restaurant name"
              value={formData.restaurant_name}
              onChange={(e) => handleInputChange("restaurant_name", e.target.value)}
              className={errors.restaurant_name ? "border-red-500" : ""}
            />
            {errors.restaurant_name && (
              <p id="restaurant-name-error" className="text-sm text-red-600">
                {errors.restaurant_name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurant_logo" className="text-sm font-medium">
              Restaurant Logo URL
            </Label>
            <Input
              id="restaurant_logo"
              name="restaurant_logo"
              type="url"
              placeholder="Enter logo URL"
              value={formData.restaurant_logo}
              onChange={(e) => handleInputChange("restaurant_logo", e.target.value)}
              className={errors.restaurant_logo ? "border-red-500" : ""}
            />
            {errors.restaurant_logo && (
              <p id="restaurant-logo-error" className="text-sm text-red-600">
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="restaurant_status" className="text-sm font-medium">
              Restaurant Status
            </Label>
            <Select
              name="restaurant_status"
              value={formData.restaurant_status}
              onValueChange={(value) => handleInputChange("restaurant_status", value)}
            >
              <SelectTrigger className={errors.restaurant_status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            {errors.restaurant_status && (
              <p id="restaurant-status-error" className="text-sm text-red-600">
                {errors.restaurant_status}
              </p>
            )}
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}