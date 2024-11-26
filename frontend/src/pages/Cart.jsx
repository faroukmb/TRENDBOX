import { useContext, useEffect, useState } from "react"
import { Shopcontext } from "../context/Shopcontext"
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";


const Cart = () => {
  const {products,currency,cartItems,updateQuantity,navigate}=useContext(Shopcontext)
  const [cartData,setCartData]=useState([]);
  useEffect(()=>{
    if(products.length >0){
       const tempData=[];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] >0){
          tempData.push(
            {
              _id: items,
              size:item,
              quantity: cartItems[items][item]
         } )
        }
      }
    }
    setCartData(tempData);
  }
  },[cartItems,products])
  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"}/> 
      </div>
     <div className="">
      {
        cartData.map((item,index)=> {
          const productdata=products.find((product )=>product._id === item._id);
          return(
            <div className="pr-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4" key={index}>
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productdata.image[0]} alt="" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productdata.name}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <p>{currency}{productdata.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">{item.size}</p>
                  </div>
                </div>
              </div>
              <input type="number" min={1} defaultValue={item.quantity} className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1" onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null :updateQuantity(item._id,item.size,Number(e.target.value))} />
              <img src={assets.bin_icon} className="w-4 mr-4 sm:-5 cursor-pointer" alt="bin_icon"  onClick={()=>updateQuantity(item._id,item.size,0)}/>
            </div>
          )
        })
      }
      
     </div>
     <div className="flex justify-end my-20">
      <div className="w-full sm:w-[450px]">
        <CartTotal/> 
        <div className="">
          <button className="bg-black text-white px-8 py-3 text-sm relative left-56 my-4 active:bg-gray-700" onClick={()=>navigate("placeorder")}> PROCEED TO CHECKOUT</button>
        </div>
      </div>
     </div>
    </div>
  )
}

export default Cart