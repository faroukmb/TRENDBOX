import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { currency } from '../App'


const List = ({token}) => {
  const [list,setList] =useState([])
  const handleremove = async (id)=>{
     try {
        const res = await axios.post("http://localhost:4000/api/product/remove",{id},{headers:{token}})
        console.log(res);
        
        if(res.data.success){
          toast.success(res.data.message)
          await fetchlist()
        }
        else{
          toast.error(res.data.message)
        }
        
     } catch (error) {
       console.log(error);
       toast.error(error)
     }
  }
  const fetchlist = async ()=>{
  try {
    const res =await axios.get("http://localhost:4000/api/product/list")
    if(res.data.success){
     setList(res.data.products) 
    }
    else{
      toast.error(res.data.message)
    }
    
  } catch (error) {
    console.log(error);
    
  }
}

useEffect(()=>{
  fetchlist()
},[]);
return(
  <>
     <p className="mb-2">All Products List </p>
     <div className="flex flex-col gap-2">
         <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
         </div>
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                <img className='w-12 ' src={item.image[0]} alt="product image" />  
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}{currency}</p>
                <p className=' text-right md:text-center cursor-pointer text-lg ' onClick={()=>handleremove(item._id)} >X</p>
                        

            </div>
          ))
        }

     </div>
  </>
)

}

export default List