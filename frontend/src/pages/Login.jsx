import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Shopcontext } from "../context/Shopcontext";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState,setCurrentState]=useState('Login')
  const {token ,setToken, navigate ,backendurl}=useContext(Shopcontext)
  const [email,setEmail] =useState("")
  const [password,setPassword]=useState("")
  const [name,setName] = useState("")
  const onSubmitHandler =async (event)=>{
     event.preventDefault();
     try {
      if(currentState === "Sign Up"){
        const res = await axios.post( backendurl + "/api/user/register",{name,email,password})
        if(res.data.success){
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token)
          toast.success(res.data.message)
        }
        else{ 
            toast.error(res.data.message)
        }
       } 
       else{
        const res = await axios.post(backendurl + "/api/user/login",{email,password})
        if (res.data.success){
           console.log(res.data.token);
           
           setToken(res.data.token)
           localStorage.setItem('token' ,res.data.token)
        }
        else{
          toast.error(res.data.message)
        }
       }
     
     } catch (error) {
       console.log(error);
       
     }
     
     } 
     
     
    
     useEffect(()=>{
        if(token){
          navigate('/');
        }
     },[token])
    
  
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
    <div className="inline-flex items-center gap-2 mb-2 mt-10">
      <p className="prata-regular text-3xl">
        {currentState}
      </p>
      <hr className="border-none h-[1.5px] w-8 bg-gray-800"/>
      </div> 
     { currentState ==="Sign Up" ? <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className="w-full px-3 py-2 border border-gray-800"  placeholder="Name" required /> : null}
      <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className="w-full px-3 py-2 border border-gray-800" placeholder="Email" required />
      <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="w-full px-3 py-2 border border-gray-800" placeholder="Password" required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your Password?</p>
        {
          currentState === 'Login' ? <p className="cursor-pointer" onClick={()=>setCurrentState('Sign Up')}>Create account</p>: <p className="cursor-pointer" onClick={()=>setCurrentState('Login')}> Login Here</p>
        }
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">{ currentState === 'Login' ? 'Sign In' : 'Sign Up' }</button> 
    </form>
  )
}

export default Login