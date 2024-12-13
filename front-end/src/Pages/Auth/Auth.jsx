import { Link, useNavigate , useLocation } from 'react-router-dom';
import am from '../../assets/img/a.png';
import { auth } from '../../Utility/firebase';
import { Type } from '../../Utility/action.type';
// import { firebaseAuth } from '../../Utility/firebase'
import { useState , useContext } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {ClipLoader} from 'react-spinners'
import { DataContext } from '../../Components/DataProvider/DataProvider';




const SignUp = () => {

    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [error,setError]=useState('')
    const navigate = useNavigate()
    const navStateData = useLocation()
    const [loading,setLoading]=useState({
        signIn:(false),
        signUp:(false)
    })
    
    // const [{user , dispatch} ,basket   ] = useContext(DataContext);
    const [state, dispatch] = useContext(DataContext);
    const { user } = state; 

    const authHandler=async(e)=>{
        e.preventDefault()
        console.log(e.target.name)
        setLoading({...loading,signIn:true})
        if(e.target.name ==="signIn"){
            
            signInWithEmailAndPassword(auth , email , password).then((userInfo)=>{
                console.log(userInfo);
                dispatch({
                    type:Type.SET_USER,
                    user:userInfo.user
                    
                })
                setLoading({...loading,signIn:false})
                navigate(navStateData?.state?.redirect || '/')
            }).catch((err)=>{setError(err.message)
                console.log(err)
                setLoading({...loading,signIn:false})
            })
    
        }else{
            setLoading({...loading,signUp:true})
            await createUserWithEmailAndPassword(auth , email , password).then((userInfo)=>{
                
                console.log(userInfo)
                dispatch({
                    type:Type.SET_USER,
                    user:userInfo.user
                })
                setLoading({...loading,signUp:false})
                navigate(navStateData?.state?.redirect || '/')
            }).catch((err)=>{setError(err.message)
                setLoading({...loading,signUp:false})
            })
        }
    }

    
    return (
        <div className='grid place-items-center'>
            <Link to='/' className='w-52 mt-[-2%]'>
                <img src={am} alt="" className=' bg-white block'/>
            </Link>
            <div className='border border-black border-opacity-50 p-7 m-[-2%]'>
                <div className=''>
                <p  className='mb-3 text-3xl font-semibold'>Sign In</p>
                {
                    navStateData?.state?.msg && (
                        <small className='text-red-600 p-10'>{ navStateData?.state?.msg}</small>
                    )
                }
                <form action="" className='space-y-3 '>
                    <div className='space-y-2 '>
                        <label htmlFor="email" className='font-semibold'>E-mail</label><br/>
                        <input type="email" name="" id=""  placeholder='xyz@gmail.com'
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}  
                        className='pr-20 pl-2 py-1  border  border-black focus:outline-none focus:border-[#B4D2EE] focus:border-2'/>
                    </div>
                    <div  className='space-y-2 '>
                    <label htmlFor="password" className='font-semibold'>Password</label><br/>
                    <input type="password" name="password" id="" placeholder='********'
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    className={`pr-20 pl-2 py-1 border border-black focus:outline-none focus:border-[#B4D2EE] focus:border-2 ${
                    password ? "no-eye" : ""}`} ></input>
                    </div>
                        <div>
                            <button type="submit" 
                            onClick={authHandler}
                            name='signIn'
                            className='bg-[hsl(29,84%,52%)] w-[270px] py-1 mt-2 hover:bg-[#c57021]'>
                            {
                                loading.signIn? (<div> <ClipLoader size={22} /> </div> ):( "Sign In" )}
                                
                                </button> 
                        </div>
                        
                        
                </form>
                </div>
                <p className='w-64 text-xs text-justify my-3'>By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
                <div>
                    <button
                    name ='signup'
                    onClick={authHandler}
                    className='bg-[#F2F2F2] w-[270px] py-1 border border-[#F1F1F1] hover:bg-[#D4D4D4] flex items-center justify-center' >
                        {loading.signUp? ( <ClipLoader size={22} />  ):( "Create your Amazon Account" )}
                    </button>
                </div>
                {
                    error && <p className='text-red-500 w-[280px] px- '>{error}</p>
                }
                
                
                <div></div>
                
            </div>
        </div>
    )
}

export default SignUp