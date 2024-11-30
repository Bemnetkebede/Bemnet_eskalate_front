import {Link } from "react-router-dom"
const CatagoryCard = ({data}) => {
    console.log(data)
    const {imgLink , title , name } = data

    return (
        <div className="h-[250px] w-[250px] bg-white  shadow-custom p-3 ">
            <Link to={`/catagory/${name}`}>
                <span>
                    <h2 className="text-black font-bold text-2xl ">{title}</h2>
                

                </span>
                <img src={imgLink} alt="" className=" h-60 py-3"/>
                <p className="p-2 font-semibold text-[rgb(232,151,59)] hover:text-black ">shop now</p>
            </Link>
        </div>

    )
}

export default CatagoryCard