/* eslint-disable no-case-declarations */
import { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { Shopcontext } from '../context/Shopcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
const PlaceOrder = () => {
  const [method ,setMethod] =useState('cod')
  const {navigate,backendurl, setCartItem ,token, cartItems,getCartAmount ,shippingfee , products} =useContext(Shopcontext)
  const [formData,setFormData] = useState({
    firstname: "",
    lastname: "",
    email : "",
    street: "",
    city: "",
    state : "",
    zipcode : "",
    country : "",
    phone :""
    
  })
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prev)=>({...prev, [name] : value}))
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
    
          for (const itemSize in cartItems[itemId]) {
            if (cartItems[itemId][itemSize] > 0) {
              const itemInfo = structuredClone(products.find((prod) => prod._id === itemId));
              if (itemInfo) {
                itemInfo.size = itemSize;
                itemInfo.quantity = cartItems[itemId][itemSize];
                orderItems.push(itemInfo);
                console.log("Order items:", orderItems);
              }
            }
        }
      }
  
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + shippingfee,
      };
      console.log("Order data:", orderData);
  
      switch (method) {
        case 'cod':
          const res = await axios.post(backendurl + "/api/order/place", orderData, { headers: { token } });
          if (res.data.success) {
            setCartItem({});
            navigate("/orders");
            console.log(res.data);
          } else {
            toast.error(res.data.message);
          }
          break;
          case 'stripe':
            const resS = await axios.post(backendurl + "/api/order/stripe", orderData, { headers: { token } });
            if (resS.data.success) {
              const {session_url}= resS.data
              window.location.replace(session_url)
            
            } else {
              toast.error(resS.data.message);
            }
            break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/** left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
           <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>
        <div className="flex gap-3">
        <input type="text" name='firstname' placeholder='FirstName' value={formData.firstname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={(e)=>onChangeHandler(e)}required />
           <input type="text" name='lastname' placeholder='LastName' value={formData.lastname} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={(e)=>onChangeHandler(e)}required />
        </div>
        <input type="email" name='email' placeholder='Email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={(e)=>onChangeHandler(e)}required />
        <input type="text" name='street' onChange={(e)=>onChangeHandler(e)} value={formData.street} placeholder='Street' className='border border-gray-300 rounded py-1.5 px-3.5 w-full'  />
        <div className="flex gap-3">
           <input type="text" name='city' placeholder='City' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={(e)=>onChangeHandler(e)}required />
           <input type="text" name='state' placeholder='State' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={(e)=>onChangeHandler(e)} required />
        </div>
        <div className="flex gap-3">
           <input type="number" name='zipcode' placeholder='Zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={(e)=>onChangeHandler(e)} required />
           <input type="text" name='country' placeholder='Country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={(e)=>onChangeHandler(e) }required/>
        </div>
        <input type="number" name='phone' placeholder='Phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={(e)=>onChangeHandler(e)} required />
      </div>
       {/** right side */}
       <div className="mt-8">
        <div className="pt-8 min-w-80">
          <CartTotal/>
        </div>
        <div className="mt-12">
          <Title text1={'PAYMENT'} text2={"METHOD"}/>
          <div className="flex gap-3 flex-col lg:flex-row">
            {/**Payment method */}
            <div onClick={()=> setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="stripe logo" />
            </div>
            <div onClick={()=> setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer ">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${ method === "cod" ? "bg-green-400" : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
           <button type='submit' className='bg-black text-white py-3 px-16 text-sm active:bg-gray-500'>PLACE ORDER</button>
          </div>
        </div>
       </div>
    </form>
  )
}

export default PlaceOrder