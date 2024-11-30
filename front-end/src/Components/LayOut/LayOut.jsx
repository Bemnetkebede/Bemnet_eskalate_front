import Header from '../Header'
import LowerHeader from '../LowerHeader'


const LayOut = ({children}) => {
    return (
        <div>
            <Header/>
            <LowerHeader/>
            {children}
        </div>
    )
    }

export default LayOut

