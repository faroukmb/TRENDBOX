import { useContext, useEffect, useState } from "react"
import { Shopcontext } from "../context/Shopcontext"
import Title from "./Title";
import ProductItem from "./ProductItem";


const RelatedProducts = ({category,supCategory}) => {
    const {products} =useContext(Shopcontext);
    const [related,setRelated]=useState([]);
    useEffect(()=>{
        if(products.length>0){
            let copy=products.slice();
            copy=copy.filter(item => category=== item.category);
            copy = copy.filter(item => supCategory === item.subCategory);
            setRelated(copy.slice(0,5));
        }
        
    },[products])
  return (
    <div className="my-24">
         <div className="text-center text-3xl py-2">
            <Title text1={'RELATED'} text2={"PRODUCTS"}/>
         </div>
         <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                related.map((item,index)=>{
                    return <ProductItem key={index}  id={item._id} image={item.image} name={item.name} price={item.price} />
                })
            }
         </div>
    </div>
  )
}

export default RelatedProducts