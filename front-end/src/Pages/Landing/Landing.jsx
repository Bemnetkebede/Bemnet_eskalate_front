import LayOut from '../../Components/LayOut/LayOut';
import  CarouselEffect  from '../../Components/carousel/carouselEffect';
import Catagory from '../../Components/catagory/Catagory';
import Product from '../../Components/products/Products'
const Landing = () => {
    return (
        <LayOut>
            <CarouselEffect/>
            <Catagory/>
            <Product/>
        </LayOut>
    )
}

export default Landing
