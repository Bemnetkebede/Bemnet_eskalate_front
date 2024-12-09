import { useContext } from 'react';
import Logo from '../assets/img/amazonlogo.png'
import flag from '../assets/img/flag.jpg'
import { IoMdSearch } from "react-icons/io";
import { LuShoppingCart } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { Link } from 'react-router-dom';
import { DataContext } from './DataProvider/DataProvider';
import {auth} from '../Utility/firebase'


const Header = () => {
    
    
    const [{user, basket} , dispatch]= useContext(DataContext)
    
    return (
        <>
            <div className="md:flex bg-black px-4 pt-2 pb-3  shadow-custom ">
                <a className=' hover:border hover:border-white flex justify-center align-items-center'>
                    <img src={Logo} alt="" className='w-24 pt-3' />
                </a>
                <div className=' hover:border hover:border-white flex justify-center align-items-center'> 
                    <a className=' text-white '>
                        <span className='text-xs opacity-80 pl-9'>Deliver to</span><br/>
                        <div className='flex'>
                            <span>
                                <SlLocationPin className='text-white  ml-5 mt-1 ' />
                            </span>
                            <div className='font-bold text-base '>Ethiopia</div>
                        </div>
                        </a>
                
                </div>
                
                
                <div className='bg-white text-black flex rounded-md  focus-within:border-[#F79B34] h-10 mt-1 mx-4'>
                    <select name="" id="" className='bg-[#D4D4D4] px-2 rounded-l-md border hover:border-[#F79B34] hover:border-2  '>
                        <option value="All">All</option>
                    </select>
                    <input type="text" placeholder='Search Amazon' className='px-2 w-[575px]  border-none focus:outline-none'/>
                    <div className='bg-[rgb(197,122,35)] px-2  rounded-r-md hover:bg-[rgb(145,89,25)]'>
                        <IoMdSearch className='h-12 w-8 '/>
                    </div>
                    
                </div>
                {/* right side */}
                <div className=' flex justify-center align-items-center'>
                <div className='text-white flex space-x-4 '>
                <div className='flex hover:border hover:border-white '>
                    <img src={flag} alt="" className='w-6 h-4 mt-5' />
                    <select name="" id="" className='bg-black text-white mt-1 text-sm '>
                        <option value="" className='text-sm'> EN</option>
                    </select>
                </div>
                <Link to={!user && "/Auth"} className='hover:border hover:border-white'>
                    <div>
                        {
                            user ? (
                                
                                    <div>
                                    <p>Hello {user?.email.split('@')[0]}</p>
                                    <span
                                        onClick={() => {
                                        auth.signOut()
                                            .then(() => {
                                            dispatch({
                                                type: 'SET_USER', // Fixed: Should be `type` in lowercase
                                                user: null,
                                            });
                                            console.log("User logged out successfully");
                                            })
                                            .catch((error) => {
                                            console.error("Error during logout:", error);
                                            });
                                        }}
                                        className="cursor-pointer"
                                    >
                                        LogOut
                                    </span>
                                    </div>

                            ) : (
                                <>
                                    <p className='text-sm opacity-90'>Sign in</p>
                                    <span>Account & Lists</span>
                                </>

                            )
                        }
                    </div>
                    
                    
                </Link>
                <Link to="/Orders" className='hover:border hover:border-white'>
                    <p className='text-sm opacity-90'>return </p>
                    <span className='text-base'>
                        & Orders
                    </span>
                </Link>
                <Link to="/cart" className='relative mt-4'>
                <span className='text-[rgb(232,151,59)] font-bold  absolute -top-2 pl-[13px] '> {basket.length} </span>
                    <LuShoppingCart className='h-6 w-8 mt-0 '/>
                    
                </Link>
                </div>
                </div>

            </div>
        </>
    )
}

export default Header