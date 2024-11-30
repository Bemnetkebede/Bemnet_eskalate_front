import {img} from './data';
import {Carousel} from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css';



const carouselEffect = () => {
    return (
        <div>
            <Carousel
                autoplay={true}
                infiniteLoop={true}
                showIndicators={false}
                showThumbs={false}

            >
                {
                img.map((imageItem,index)=>(
                    <div key={index} >
                        <a href="">
                        <img src={imageItem} alt='img'  />
                        
                        </a>
                        
                        
                        <div className="absolute inset-0 bg-gradient-to-b from-[rgb(255,255,255,0)] to-white"></div>
                    </div>
                    
                    

                ))}

            </Carousel>
            
        </div>
    )
    }

export default carouselEffect