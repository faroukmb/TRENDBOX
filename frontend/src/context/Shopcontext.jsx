import  { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export const Shopcontext = createContext();
// eslint-disable-next-line react/prop-types
const ContextProvider= ({children})=>{
   const currency='$';
   const shippingfee=10;
   const backendurl= import.meta.env.VITE_BACKEND_URL;
   const [search,setSearch]=useState('');
   const [showSearch,setShowSearch]=useState(false);
   const [cartItems,setCartItem] =useState({})
   const [products,setProducts] =useState([])
   const [token,setToken] =useState("")
   const navigate = useNavigate();
   const addToCart =async(itemId,size)=>{
    if(!size){
      toast.error("select Product Size");
      return;
    }
    let cartItemsCopy =structuredClone(cartItems);
    
    if(cartItemsCopy[itemId]){
      if(cartItemsCopy[itemId][size]){
        cartItemsCopy[itemId][size]+=1;
      }
      else{
        cartItemsCopy[itemId][size]=1
      }
    }
    else{
      cartItemsCopy[itemId] ={}
      cartItemsCopy[itemId][size]= 1
    }
     setCartItem(cartItemsCopy)
     if (token){
        try {
           await axios.post(backendurl + "/api/cart/add",{itemId,size},{headers :{token}})
            
        } catch (error) {
           console.log(error);
           toast.error(error.message)
           
        }
     }
   }
   const updateQuantity=async (itemId,size,quantity)=>{
      let cartData= structuredClone(cartItems)
      cartData[itemId][size]=quantity;
      setCartItem(cartData)
      if (token){
        try{
           await  axios.post(backendurl +"/api/cart/update",{itemId,size,quantity},{headers:{token}})
        }
        catch (error) {
          console.log(error);
          toast.error(error.message)
          
       }
      }
   }
   const getUserCart = async (token) =>{
     try {
        const res = await axios.post(backendurl + "/api/cart/get",{},{headers : {token}})
        if (res.data.success){
          setCartItem(res.data.cartData)
        }
     } catch (error) {
       console.log(error);
       toast.error(error.message)
     }
   }

   const getCartCount=()=>{
       let totalCount =0;
       for(const items in cartItems){
        for(const item in cartItems[items]){
           try {
            if(cartItems[items][item] > 0){
              totalCount+=cartItems[items][item]
            }
           } catch (error) {
            console.log(error)
           }
        }
       }
       return totalCount;
   }  
   const getProductData =async ()=>{
      try {
         const res =await axios.get(backendurl+"/api/product/list")
         if(res.data.success){
            setProducts(res.data.products)
         }
        } catch (error) {
         console.log(error);
         
      }
   } 
   useEffect(()=>{getProductData()},[])
   useEffect(()=>{
    if (!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
   },[])
   const getCartAmount =()=>{
    let totalAmount =0;
    for(const items in cartItems){
      let itemInfo= products.find((product)=>product._id === items);
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item] >0 ){
            totalAmount += itemInfo.price * cartItems[items][item];
          }
          
        } catch (error) {
          console.log(error)
        }
      }
    
    }
    return totalAmount
   }
    const values={
        products,currency,shippingfee,
        search,setSearch,showSearch,setShowSearch,cartItems,setCartItem,addToCart,getCartCount,updateQuantity,getCartAmount,navigate,backendurl,setToken,token
    }
    return(
       <Shopcontext.Provider value={values}>
         {children}
       </Shopcontext.Provider>
    )
}
export default ContextProvider;