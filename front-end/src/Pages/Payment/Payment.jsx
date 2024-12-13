import  LayOut  from "../../Components/LayOut/LayOut"
import {DataContext} from '../../Components/DataProvider/DataProvider'
import { useContext } from "react";
import ProductCard from "../../Components/products/ProductCard";
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { useState } from "react";
import CurrencyFormate from "../../Components/CurrencyFormat/currencyFormat";
import {instance} from '../../Api/axios'
import {ClipLoader} from 'react-spinners'
import { useNavigate } from "react-router-dom";
import { db }  from '../../Utility/firebase'
import { doc, setDoc } from 'firebase/firestore';
import { Type } from "../../Utility/action.type";

const Payment = () => {
    const [{ basket, user },dispatch] = useContext(DataContext);
    const [error , setError] = useState('')
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    // console.log(basket);
    const stripe = useStripe();
    const elements = useElements();

    // Calculate total
    const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

    const hadlechanges = (e)=>{
        setLoading(true)
        setError(e.error.message)
        console.log(e.error.message)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await instance({
                method : 'POST',
                url : `payment/create?total=${total * 100}`,
            }) 
        console.log(response.data)
        const clientSecret = response.data.clientSecret
        const { paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        console.log(paymentIntent)
        
        const userOrdersRef = doc(db, `user/${user.uid}/orders`, paymentIntent.id);
        await setDoc(userOrdersRef, {
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
        });
        dispatch({type:Type.EMPTY_BASKET})
        setLoading(false)
        navigate('/orders' , {state : {msg:'you have placed new order'}})}
        catch (error) {
            console.log(error)
            setLoading(false)}
        }
    
    return (
        <LayOut>
            <div>
                <div className="grid place-items-center text-xl p-4 bg-[#D4D4D4]">
                    Checkout ({basket.length}) items
                </div>
                <div className="flex gap-56 ml-32 my-8 ">
                    <div className="font-bold mr-56">Delivery Address</div>
                    <div>
                        <div>{user?.email}</div>
                        <div>123 street</div>
                        <div>Addis Ababa</div>
                    </div>
                
                </div>
                <hr className="mx-8 p-2 p-1 border-black" />
                <div className="flex ml-32 my-8 w-full ">
                    <div className="font-bold mr-56">Review Items and Delivery</div>
                    <div className="">
                        {
                            basket?.map((item,index)=>(
                                <ProductCard data={item} key={index} flex={true} payment={true} />
                            ))
                            
                        }
                    </div>
                </div>
                <hr className="mx-8 p-1 border-black"/>
                <div className="flex ml-32 my-8 ">
                    <div className="font-bold mr-56">Payment Method</div>
                    <div>
                        <div>
                            <form onSubmit={handleSubmit}>
                                {error && <div className="text-red-600 font-bold py-3">
                                    <small >{error }</small> 
                                </div> }
                                <CardElement 
                                className="w-[350px]"
                                onChange={hadlechanges}
                                />
                                <div>
                                <div className="space-x-3 flex">
                                    
                                    Total order |<p></p> <CurrencyFormate amount={total}/> 
                                </div>
                                <button type="submit" className="bg-[#E8973B] rounded-sm px-32 my-3">
                                    {
                                        loading ? (<ClipLoader size={16} />) : "pay now"
                                    }
                                </button>
                            </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </LayOut>
    )
}

export default Payment