import { useContext, useState } from 'react'
import { Shopcontext } from '../context/Shopcontext';
import ProductItem from './ProductItem';
import Title from './Title';
import {useEffect } from 'react';
const Bestseller = () => {
    const {products}=useContext(Shopcontext);
    const [bestsellers,setBestSellers]=useState([])
    useEffect(()=>{
        const mostbought= products.filter(prod => prod.bestseller === true)
       setBestSellers(mostbought.slice(0,5));
    },[products])
     return (
       <div className='my-10'>
           
           <div className="text-center py-8 text-3xl">
               <Title text1={"BEST"} text2={"SELLERS"}/>
               <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
               Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
           </div>
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
              {
               bestsellers.map((item,index)=> <ProductItem key={index}  id={item._id} image={item.image} name={item.name} price={item.price}/>)
            }  
           </div>
       </div>
       )
}

export default Bestseller