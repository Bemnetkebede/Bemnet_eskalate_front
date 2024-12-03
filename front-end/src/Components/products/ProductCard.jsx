import Rating from "@mui/material/Rating"
import CurrencyFormate from "../CurrencyFormat/currencyFormat"
import {Link } from 'react-router-dom'
import { useContext } from "react"
import { DataContext } from "../DataProvider/DataProvider"
import {Type} from '../../Utility/action.type'
const ProductCard = ({data , flex , renderDescription , renderAdd}) => {
    const {image , title ,rating , price , id , description} = data

    const [state, dispatch ] = useContext(DataContext)

    const addToCart = () =>{
        dispatch({
            type : Type.ADD_TO_BASKET ,
            item : {
                image , title , id , rating , price , description
            }

            
        })
    }



    return (
        <div className={`h-[350px] w-[200px] bg-white ${flex ? 'flex my-0' : 'shadow-custom'}`}>
            <div>
                <Link to={`/product/${id}`}>
                            <img src={image} alt="" 
                            className={`h-[200px]  pl-10 p-5
                            ${flex ? 'h-[150px] max-w-[200px] p-10' : ''}`}/>
                </Link>
            </div>
            
            <div className={`pl-5 ${flex ? ' px-40' :'' }`}> 
                <h3 className="font-bold">{title}</h3>
                { renderDescription && <p className={` ${flex ? 'w-[580px] space-y-3' : ''}`}> {description}</p>}
                <div>
                    <Rating value={rating?.rate} precision={0.1} />

                    <small>{rating?.count}</small>
                </div>
                <div>
                    <CurrencyFormate amount={price}/>
                </div>
                {
                !renderAdd && (
                <div className="relative group">
                    <button className={`bg-[rgb(232,151,59)] px-12 rounded-lg my-2 ${flex ? 'visible' : 'invisible'} group-hover:visible `}
                    onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>)
                }

                

            </div>
    
        </div>
    )
}

export default ProductCard