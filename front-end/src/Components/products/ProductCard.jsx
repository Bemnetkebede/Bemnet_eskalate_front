import Rating from "@mui/material/Rating"
import CurrencyFormate from "../CurrencyFormat/currencyFormat"
import {Link } from 'react-router-dom'
import { useContext } from "react"
import { DataContext } from "../DataProvider/DataProvider"
import {Type} from '../../Utility/action.type'
const ProductCard = ({data , flex , renderDescription ,  renderAdd , payment}) => {
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



    return(
    <div className={`h-[350px] w-[200px] p-0 ${flex ? 'flex  w-full ' : ''}  ${payment ? 'flex gap-0 mb-24 h-[140px]  ' : ''}
    ${!flex && !payment ? 'shadow-custom' : ''} `} >

            <div>
                <Link to={`/product/${id}`}>
                            <img src={image} alt="" 
                            className={`h-[180px] max-w-[100px]  p-3
                            ${flex ? 'h-[150px] max-w-[200px] p-10' : ''} 
                            ${payment ? 'h-[130px] max-w-[200px] p-3 ' :''}`}/>
                </Link>
            </div>
            
            <div className={`pl-5 ${flex ? ' px-40 w-full' :'' }`}> 
                <h3 className="font-bold mt-6 w-full">{title}</h3>
                { renderDescription && <p className={`${flex ? 'w-[580px] space-y-3' : ''} md:block lg:block hidden }`}> {description}</p>}
                <div className={`${payment ? 'flex space-x-2 my-5' :''}`}>
                    <Rating value={rating?.rate} precision={0.1} />

                    <small>{rating?.count}</small>
                </div >
                <div  >
                    <CurrencyFormate amount={price}/>
                </div>
                {
                !renderAdd && (
                <div className="relative group">
                    <button className={`bg-[rgb(232,151,59)] px-12 rounded-lg my-2 ${flex ? 'visible' : 'invisible'} ${payment ? 'invisible group-hover:invisible' : 'visible'}  group-hover:visible  `}
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