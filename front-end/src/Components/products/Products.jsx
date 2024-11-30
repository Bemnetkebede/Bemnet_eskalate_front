import { useEffect, useState } from "react"
import axios from 'axios'
import ProductCard from "./ProductCard"


const Products = () => {
    const [products , setProducts]=useState([])
    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then(res=>setProducts(res.data)).catch((err)=>console.log(err))
    },[])
    return (
        <div className="grid grid-cols-4 place-items-center mt-[10%]">
            {
            products?.map((singleValue) => (
                    <ProductCard key={singleValue.id} data={singleValue} index={singleValue.id} />
            ) )
        }

            
        </div>
    )
}

export default Products