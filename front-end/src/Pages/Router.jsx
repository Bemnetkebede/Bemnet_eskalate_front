import Landing from "./Landing/Landing";
import Auth from "./Auth/Auth";
import Orders from "./Orders/Orders";
import Payment from "./Payment/Payment";
import ProductDetails from './ProductDetail/ProductDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './Result'
import ProductDetail from "./ProductDetail/ProductDetail";
import Cart from './cart/Cart'
    

const Routering = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/Auth" element={<Auth />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/ProductDetails" element={<ProductDetails />} />
            <Route path="/Catagory/:CatagoryName" element={<Result />} />
            <Route path="/product/:ProductId" element={<ProductDetail />} />
            <Route path="/Cart" element={<Cart />} />
        </Routes>
        
        </BrowserRouter>
    )
}

export default Routering
