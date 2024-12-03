import { CatagoryInfo } from './catagoryInfo';
import CatagoryCard from './catagoryCard';

const Catagory = () => {
    console.log(CatagoryInfo)
    return (
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 relative mt-[-13%] place-items-center my-10">
            {
                
                    CatagoryInfo?.map((infos) => (
                        <CatagoryCard key={infos.name} data={infos} />))

            }
        </div>

    )
    }

export default Catagory