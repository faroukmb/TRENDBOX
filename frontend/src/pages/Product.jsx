import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Shopcontext } from "../context/Shopcontext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const {productId}=useParams();
  const {products,currency,addToCart}=useContext(Shopcontext)
  const [productData,setProductData]=useState(false)
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')
  const fetchProductData = async ()=>{
   products.map((item)=>{
     if(item._id === productId){
       setProductData(item);
       setImage(item.image[0])
       return null;
     }
   })
  }
  useEffect(()=>{
    fetchProductData();
  },[productId,products]);
  return productData ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full" >
            {productData.image.map((item,index)=>(
              <img onClick={()=>setImage(item)} src={item} alt="product image" key={index} className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer" />
            ))}
          </div>
            <div className="w-full sm:w-[80%]">
              <img className="w-full h-auto" src={image} alt="big image" />
            </div>
         </div>
         {/**Product Info */}
         <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star" className="w-3 5"/>
            <img src={assets.star_icon} alt="star" className="w-3 5"/>
            <img src={assets.star_icon} alt="star" className="w-3 5"/>
            <img src={assets.star_icon} alt="star" className="w-3 5"/>
            <img src={assets.star_dull_icon} alt="star" className="w-3 5"/>
            <p className="pl-2">{122}</p>
          </div>
          <p className="mt-5 text-3xl font-medium" >{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8 ">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item,index)=>(
               <button className={`border py-2 px-4 bg-gray-100 ${ size === item ? 'border border-orange-500': ''}`} onClick={()=> setSize(item)} key={index} >{item}</button> 
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 " onClick={()=>addToCart(productData._id,size)}>ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 ">
            <p>100% Original product.</p>
            <p>Cash and delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
         </div>
      </div>
      {/** Description and review */}
      <div className="mt-20">
        <div className="flex">
          <b className="border p-5 py-3 text-sm">Description
          </b>
          <p className="border p-5 py-3 text-sm">Reviews {122}</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ex, natus delectus praesentium, deserunt quibusdam maxime, inventore reprehenderit aut harum esse dicta culpa laborum? Inventore aspernatur placeat fugiat voluptatem quam.</p>
          <p>TrendBox is a vibrant online shop that caters to fashion enthusiasts seeking the latest styles and trends in clothing. With a curated collection that features everything from chic everyday wear to statement pieces, TrendBox ensures that every customer can find something that resonates with their personal style. </p>
        </div>
      </div>
      {/**Related Products */}
      <RelatedProducts  category={productData.category} supCategory={productData.subCategory}/>
    </div>
  ) : <div className="opacity-0"></div>
}

export default Product