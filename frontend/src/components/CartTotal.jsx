import { useContext } from 'react'
import { Shopcontext } from '../context/Shopcontext'
import Title from './Title';

const CartTotal = () => {
    const {currency,shippingfee,getCartAmount}=useContext(Shopcontext);
  return (
    <div className='w-full'>
        <div className="text-2xl">
            <Title text1={"CART"} text2={"TOTALS"}/>
        </div>
        <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>{currency} {getCartAmount()}.00</p>
            </div>
            <div className="flex justify-between">
                <p>Shipping fee</p>
                <p>{currency}{ shippingfee}.00</p>
            </div>
            <div className="flex justify-between">
                <p>Total</p>
                <p>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + shippingfee}.00</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal