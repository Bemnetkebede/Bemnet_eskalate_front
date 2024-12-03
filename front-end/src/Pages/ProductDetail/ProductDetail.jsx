import { useEffect, useState } from "react";
import  LayOut  from "../../Components/LayOut/LayOut"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { ProductUrl } from "../../Api/endpoint";
import ProductCard from "../../Components/products/ProductCard";
import Loader from "../../Components/Loader/Loader";

const ProductDetail = () => {
    const   {ProductId } = useParams()
    console.log(ProductId)
    const [product, setProduct] = useState([])
    const [Loading , setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios.get(`${ProductUrl}/products/${ProductId}`)
            .then((res) => {setProduct(res.data)
                setLoading(false)}
            )
            .catch((err) => {
                console.error(err);
                setLoading(false)
            });
    }, [ProductId]);
    console.log(`${ProductUrl}/products/${ProductId}`)

    return (
        Loading ? <Loader/> : (<LayOut>
            <ProductCard data={product}
            flex = {true}
            renderDescription = {true}
            />
        </LayOut>)
        
        
    )
}

export default ProductDetail
