import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import {NavLink, Link} from "react-router-dom"
import { Shopcontext } from "../context/Shopcontext"
const Navbar = () => {
  const [visible,setVisible]=useState(false)
  const {setShowSearch,getCartCount, navigate , token ,setToken,setCartItem}= useContext(Shopcontext)
  const logout  =() =>{
    localStorage.removeItem("token")
    setToken('')
    setCartItem({})
    navigate('/login')
  }
  return (
    <div className='flex h-24 justify-between px-0 items-center font-medium  rounded-sm'>
     <Link to="/"><img src={assets.logo} className="h-12 sm:mr-11 -ml-15  " alt="logo" /></Link>
            <ul className="hidden  sm:flex text-sm text-gray-700  ">
              <NavLink to="/" className="flex flex-col items-center mr-4">
                <p>HOME</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden "/>
              </NavLink>
              <NavLink to="/collection"  className="flex flex-col items-center mr-4 ">
                <p>COLLECTION</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
              </NavLink>
              <NavLink to="/about"  className="flex flex-col items-center mr-4  ">
                <p>ABOUT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
              </NavLink>
              <NavLink to="/contact"  className="flex flex-col items-center mr-4">
                <p>CONTACT</p>
                <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden"/>
              </NavLink>
            </ul>
            <div className="flex items-center px-10 min-w-56 sm:mr-20 md:mr-20 ">
                      <img src={assets.search_icon} className="w-5 cursor-pointer mr-5" onClick={()=>setShowSearch(true)}  alt="search icon"  /> 
                      <div className="group relative">
                        
                        <img src={assets.profile_icon} onClick={()=> token ? null : navigate('/login')} className="w-5 cursor-pointer" alt="profile icon"/>
                      {
                        token &&   <div className="group-hover:block hidden absolute dropdown-menu right-0 ">
                        <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200  text-gray-400 rounded">
                            <p className="cursor-pointer hover:text-black">My Profile</p>
                            <p className="cursor-pointer hover:text-black" onClick={()=>navigate('/orders')}>Orders</p>
                            <p className="cursor-pointer hover:text-black" onClick={logout}>Log out</p>
                        </div>
                   </div>
                      }
                      
                     </div>
                     <Link to="/cart" className="relative">
                       <img src={assets.cart_icon} className="w-5 ml-5 min-w-5" alt="cart icon" />
                       <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">{getCartCount()}</p>
                     </Link>
                     <img src={assets.menu_icon} onClick={()=>{setVisible(true)}}className="w-5 cursor-pointer mt-1 ml-5 sm:hidden"  alt="" />
            </div>
            {/* sidebar for small screens*/}
            <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}` }>
                <div className="flex flex-col text-gray-700">
                  <div onClick={()=>setVisible(false)} className="flex items-center cursor-pointer gap-4 p-3">
                     <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="dropdown icon" />
                     <p>Back</p>
                  </div>
                  <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/">HOME</NavLink>
                  <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/collection">COLLECTION</NavLink>
                  <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/about">ABOUT</NavLink>
                  <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 border" to="/contact">CONTACT</NavLink>
                </div>
            </div>
      
  

    </div>
  )
}

export default Navbar