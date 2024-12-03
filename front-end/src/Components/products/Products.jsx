import { useEffect, useState } from "react"
import axios from 'axios'
import ProductCard from "./ProductCard"
import Loader from "../Loader/Loader"

const Products = () => {
    const [products , setProducts]=useState([])
    const [Loading , setLoading] = useState(false)
    useEffect(()=>{
        setLoading(true)
        axios.get('https://fakestoreapi.com/products')
        .then(res=>{setProducts(res.data)
            setLoading(false)
        })
        .catch((err)=>{console.log(err)
            setLoading(false)
        })
    },[])
    return (
        Loading ? <Loader/> : (
        <div className="grid md:grid-cols-5 grid-cols-2 mt-[10%] place-items-center gap-5 mx-[5%] justify-between">
            {
            products?.map((singleValue) => (
                    <ProductCard key={singleValue.id} data={singleValue} index={singleValue.id} />
            ) )
        }

    </div>)
    )
}

export default Products