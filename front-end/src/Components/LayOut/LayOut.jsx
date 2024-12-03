import Header from '../Header'
import LowerHeader from '../LowerHeader'


const LayOut = ({children}) => {
    return (
        <div>
        <div className="sticky top-0 z-[100]">
            <Header/>
            <LowerHeader/>
        </div>
        <div>
            {children}
        </div>
    </div>
    )
    }

export default LayOut

