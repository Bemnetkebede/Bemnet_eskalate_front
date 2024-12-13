import Landing from "./Landing/Landing";
import Auth from "./Auth/Auth";
import Orders from "./Orders/Orders";
import Payment from "./Payment/Payment";
import ProductDetails from './ProductDetail/ProductDetail'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Result from './Result'
import ProductDetail from "./ProductDetail/ProductDetail";
import Cart from './cart/Cart'
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoutes'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QU5sn07SY9rNBUSmcUEx22FXRLZPOjxEVTO46w9efD7ApRmCUeIMWCPYhxFNPwM0lUC4ihzGmljlefQA0sfmGPH00yXVB2sa4');
    

const Routering = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/Auth" element={<Auth />} />
            <Route path="/Orders" element={
                <ProtectedRoute msg={'you must log to access your orders'} redirect={'/Orders'}>
                    <Elements stripe={stripePromise}>
                        <Orders />
                    </Elements>
                </ProtectedRoute>
                } />
                <Route path="/Payment" element={
                    <ProtectedRoute msg={'You must log in to pay'} redirect={'/Payment'}>
                        <Elements stripe={stripePromise}>
                            <Payment />
                        </Elements>
                    </ProtectedRoute>
                } />

            <Route path="/ProductDetails" element={<ProductDetails />} />
            <Route path="/Catagory/:CatagoryName" element={<Result />} />
            <Route path="/product/:ProductId" element={<ProductDetail />} />
            <Route path="/Cart" element={<Cart />} />
        </Routes>
        
        </BrowserRouter>
    )
}

export default Routering
