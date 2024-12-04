import { Link } from 'react-router-dom';
import am from '../../assets/img/a.png';


const SignUp = () => {
    return (
        <div className='grid place-items-center'>
            <Link className='w-52 mt-[-2%]'>
                <img src={am} alt="" className=' bg-white block'/>
            </Link>
            <div className='border border-black border-opacity-50 p-7 m-[-2%]'>
                <div className=''>
                <p  className='mb-3 text-3xl font-semibold'>Sign In</p>
                <form action="" className='space-y-3 '>
                    <div className='space-y-2 '>
                        <label htmlFor="email" className='font-semibold'>E-mail</label><br/>
                        <input type="email" name="" id=""  placeholder='xyz@gmail.com'
                        className='pr-20 pl-2 py-1  border  border-black focus:outline-none focus:border-[#B4D2EE] focus:border-2'/>
                    </div>
                    <div  className='space-y-2 '>
                    <label htmlFor="password" className='font-semibold'>Password</label><br/>
                    <input type="password" name="password" id="" placeholder='********'
                    className='pr-20 pl-2 py-1 border  border-black focus:outline-none focus:border-[#B4D2EE] focus:border-2'/>
                    
                    </div>
        
                        <div>
                            <button type="submit" 
                            className='bg-[hsl(29,84%,52%)] px-[114px] py-1 mt-2 hover:bg-[#c57021]'>Sign In</button> 
                        </div>
                        
                </form>
                </div>
                <p className='w-64 text-xs text-justify my-3'>By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
                <div>
                    <button
                    className='bg-[#F2F2F2] px-[33px] py-1 border border-[#F1F1F1] hover:bg-[#D4D4D4]' >Create your Amazon Account</button>
                </div>
                
                
                <div></div>
                
            </div>
        </div>
    )
}

export default SignUp