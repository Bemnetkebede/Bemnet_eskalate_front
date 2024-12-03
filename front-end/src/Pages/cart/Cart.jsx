import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/products/ProductCard";
import { useContext } from "react";
import CurrencyFormate from "../../Components/CurrencyFormat/currencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type"; // Ensure the correct constant is imported

const Cart = () => {
    const [{ basket, user }, dispatch] = useContext(DataContext);

    // Calculate total
    const total = basket.reduce((amount, item) => item.price * item.amount + amount, 0);

    
    const increment = (item) => {
        dispatch({
            type: Type.ADD_TO_BASKET,
            item,
        });
    };

    const decrement = (id) => {
        dispatch({
            type: Type.REMOVE_FROM_BASKET,
            id,
        });
    };

    return (
        <LayOut>
            <div>
                <div className="">
                    <div className="my-6 mx-10 space-y-3 basis-2/4">
                        <h4 className="text-2xl font-bold">Hello</h4>
                        <p>Your shopping basket</p>
                        <hr />
                    </div>

                    {/* Basket Summary */}
                    <div>
                        {basket?.length === 0 ? (
                            <div className="flex flex-col justify-center items-center space-y-5">
                                <p className="text-center font-bold text-3xl">Oops! No items in your cart!</p>
                                <Link to='/'><button className="bg-[rgb(232,151,59)] rounded-md px-5 py-2 hover:text-white">Click here to Add </button></Link>  
                            </div>
                        ) : (
                            <div className="my-2 mx-10 visible basis-2/4">
                                <div className="border border-slate-100 bg-slate-200 p-4 rounded-md space-y-2">
                                    <div className="flex space-x-4 ml-3">
                                        <p>Subtotal ({basket.length} items)</p>
                                        <CurrencyFormate amount={total} />
                                    </div>
                                    <span className="ml-6 space-x-2">
                                        <input type="checkbox" />
                                        <small>This order contains a gift</small>
                                    </span>
                                    <div className="bg-[rgb(232,151,59)] rounded-md">
                                        <button className="px-10">
                                            <Link
                                                to="/Payment"
                                                className="inline-block text-white"
                                            >
                                                Continue to checkout
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Basket Items */}
                {basket?.length > 0 && (
                    <div className="">
                        {basket.map((item, index) => (
                            <div key={index} className="grid grid-cols-2 items-center my-4 gap-96">
                                <div className="">
                                    <ProductCard
                                        data={item}
                                        renderDescription={true}
                                        flex={true}
                                        renderAdd={true}
                                    />
                                </div>
                                
                                <div className="space-x-2 mt-[-47%]">
                                    <div>
                                        <button
                                            onClick={() => increment(item)}
                                            className="px-3 py-1 bg-green-500 text-white rounded-md"
                                        >
                                            +
                                        </button>
                                    </div>
                                    
                                    <span className="">{item.amount}</span>
                                    <div>
                                        <button
                                            onClick={() => decrement(item.id)}
                                            className="px-[13px] py-1 ml-[-5px] bg-red-500 text-white rounded-md"
                                        >
                                            -
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </LayOut>
    );
};

export default Cart;

