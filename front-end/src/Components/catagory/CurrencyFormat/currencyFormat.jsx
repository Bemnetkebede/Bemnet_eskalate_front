import numeral from 'numeral';

const CurrencyFormate = ({amount})=>{
    const formatedAmount = numeral(amount).format("$0.0.00")
    return <div>{formatedAmount}</div>
}
export default CurrencyFormate