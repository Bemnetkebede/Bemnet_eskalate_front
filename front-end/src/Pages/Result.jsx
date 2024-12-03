import { useParams } from "react-router-dom"
import  LayOut  from "../Components/LayOut/LayOut"
import { ProductUrl } from "../Api/endpoint"
import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../Components/products/ProductCard"
import Loader from "../Components/Loader/Loader"
const Result = () => {
    const {CatagoryName} = useParams()
    const [products , setProducts] = useState([])
    const [Loading , setLoading] = useState(false)
    const categoryMapping = {
        "Jewellery": "jewelery",
        "Men's Clothing": "men's clothing",
        "Women's Clothing": "women's clothing",
        "Electronics": "electronics"
    };
    
    // Use the mapping to get the correct API category
    const mappedCategory = categoryMapping[CatagoryName] || CatagoryName.toLowerCase();

    useEffect(()=>{
        setLoading(true)
        axios.get(`${ProductUrl}/products/category/${mappedCategory}`)
        .then((res)=>{setProducts(res.data)
            setLoading(false)
        console.log(`${ProductUrl}/products/category/${mappedCategory}`)
        }).catch((err)=>{console.log(err)
            setLoading(false)
        })
    },[])
    return (
        Loading ? <Loader/> : (
        <LayOut>
            <div className="font-bold mb-6 ml-6 mt-2">Results</div>
            <p className="mb-6 ml-6">Catagory/{CatagoryName}</p>
            <hr />
            <div className="grid grid-cols-4 gap-4 relative place-items-center mt-8 ">
            {
                products.map((products)=>(
                    <ProductCard data={products} key={products.id} />
                ))
            }
            </div>
            
        </LayOut> )
    )
}

export default Result