import  LayOut  from "../../Components/LayOut/LayOut"
import { DataContext} from '../../Components/DataProvider/DataProvider'
import {db} from '../../Utility/firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { useContext , useEffect , useState } from "react";
import ProductCard from "../../Components/products/ProductCard";

const Orders = () => {
    const [{user},dispatch] = useContext(DataContext)
    const [orders , setOrders] = useState([])
    useEffect(() => {
    if (user) {
        const userOrdersRef = collection(db, "user", user.uid, "orders");
        const orderedQuery = query(userOrdersRef, orderBy("created", "desc"));
        const unsubscribe = onSnapshot(orderedQuery, (snapshot) => {
            setOrders(
                snapshot.docs.map((ce) => ({
                    id: ce.id,
                    data: ce.data(),
                }))
            );
        });
        console.log(userOrdersRef)
        // Cleanup subscription on unmount
        return () => unsubscribe();
    } else {
        setOrders([]);
    }
}, [user]);

    return (
        <LayOut>
            <section className="bg-[#efeeee] p-[30px]">
            <div className="bg-[#fff] p-[20px]">
                <h2 className="font-bold text-xl">Your Orders</h2>
                <hr className="my-4 border-2 border-[#E2AA53]"/>
                {
                    orders.length == 0 && <div>
                        you don't have orders yet
                    </div>
                }
                <div>
                {orders?.map((eachOrder, i) => (
                    <div key={i}>
                        <hr />
                        <p>Order Id: {eachOrder?.id}</p>
                        {eachOrder?.data?.basket?.map((order, index) => (
                            
                            <ProductCard key={index} data={order} flex={true} payment={true} />
                        ))}
                    </div>
                ))}
                <hr />
                </div>
            </div>
            </section>
        
        </LayOut>
    )
}

export default Orders
