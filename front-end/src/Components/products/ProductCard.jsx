import Rating from "@mui/material/Rating"
import CurrencyFormate from "../CurrencyFormat/currencyFormat"
const ProductCard = ({data}) => {
    const {image , title ,rating , price} = data
    return (
        <div className="h-[350px] w-[250px] bg-white  shadow-custom my-5 ">
            <div>
                <a href="">
                    <img src={image} alt="" className="h-[200px] p-3 pl-8 " />
                </a>
            </div>
            
            <div className="pl-5">
                <h3>{title}</h3>
                <div>
                    <Rating value={rating.rate} precision={0.1} />

                    <small>{rating.count}</small>
                </div>
                <div>
                    <CurrencyFormate amount={price}/>
                </div>
                <div className="relative group">
                <button className="bg-[rgb(232,151,59)] px-16 rounded-lg my-2 invisible group-hover:visible ">
                    add to cart
                </button>
                </div>
                

            </div>
    
        </div>
    )
}

export default ProductCard