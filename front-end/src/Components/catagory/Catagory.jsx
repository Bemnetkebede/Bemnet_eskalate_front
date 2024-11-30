import { CatagoryInfo } from './catagoryInfo';
import CatagoryCard from './catagoryCard';

const Catagory = () => {
    console.log(CatagoryInfo)
    return (
        <div className="grid grid-cols-4 gap-4 relative mt-[-13%] ml-10 ">
            {
                
                    CatagoryInfo?.map((infos) => (
                        <CatagoryCard key={infos.name} data={infos} />))

            }
        </div>

    )
    }

export default Catagory