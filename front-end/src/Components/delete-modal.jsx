
// import { AlertTriangle } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// export default function DeleteModal({ isOpen, onClose, onConfirm, foodName }) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[400px]">
//         <DialogHeader>
//           <div className="flex items-center space-x-2">
//             <AlertTriangle className="w-6 h-6 text-red-500" />
//             <DialogTitle className="text-xl font-bold text-red-600">Delete meal</DialogTitle>
//           </div>
//           <DialogDescription className="text-left pt-4">
//             Are you sure you want to delete <strong className="text-gray-900">{foodName}</strong>?
//             <br />
//             This action cannot be undone.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="flex space-x-2 pt-6">
//           <Button type="button" variant="outline" onClick={onClose} className="flex-1">
//             Cancel
//           </Button>
//           <Button type="button" variant="destructive" onClick={onConfirm} className="flex-1">
//             Delete Food
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function DeleteModal({ isOpen, onClose, onConfirm, foodName }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <DialogTitle className="text-xl font-bold text-red-600">Delete meal</DialogTitle>
          </div>
          <DialogDescription className="text-left pt-4">
            Are you sure you want to delete <strong className="text-gray-900">{foodName}</strong>?
            <br />
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 pt-6">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={onConfirm} className="flex-1">
            Delete Food
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}