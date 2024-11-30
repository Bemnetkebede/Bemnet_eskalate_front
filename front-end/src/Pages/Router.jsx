import Landing from "./Landing/Landing";
import SignUp from "./Auth/SignUp";
import Orders from "./Orders/Orders";
import Payment from "./Payment/Payment";
import ProductDetails from './ProductDetail/ProductDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './Result'
    

const Routering = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/ProductDetails" element={<ProductDetails />} />
            <Route path="/Catagory/:CatagoryName" element={<Result />} />
        </Routes>
        
        </BrowserRouter>
    )
}

export default Routering
