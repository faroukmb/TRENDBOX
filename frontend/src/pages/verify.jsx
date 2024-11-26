import React, { useContext, useEffect } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Verify = () => {
    const {navigate,setCartItem,token,backendurl}=useContext(Shopcontext)
    const [searchParams,setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId= searchParams.get('orderId')
    const verifyPayment = async ()=>{
        try {
            if (!token){
                return null
            }
            const res= await axios.post(backendurl+ "/api/order/verify",{success,orderId},{headers:{token}})
            if (res.data.success){
                setCartItem({})
                navigate('/orders')
            }
            else{
                navigate('/cart')
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>

    </div>
  )
}

export default Verify