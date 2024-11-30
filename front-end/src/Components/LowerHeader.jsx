import { IoMenuSharp } from "react-icons/io5";
const LowerHeader = () => {
    return (
        <div className="bg-gray-900">
            <ul className="text-white flex space-x-4 p-2">
                <li className="flex"><IoMenuSharp className="mt-1"/>All</li>
                <li>Today's Deals</li>
                <li>Costumer Service</li>
                <li>Registry</li>
                <li>Git Card</li>
                <li>Sell</li>
                
            </ul>
        </div>
    )
}

export default LowerHeader