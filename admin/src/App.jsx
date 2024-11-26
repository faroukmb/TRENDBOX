import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import SideBar from "./components/SideBar"
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useEffect, useState } from "react"
import Login from "./components/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const currency = '$'
  const App = () => {
    const [token,setToken] =useState(localStorage.getItem("token")? localStorage.getItem("token"): "")

    useEffect(()=>{
       localStorage.setItem("token",token);
    },[token])

     return (
       <div className="bg-gray-50 min-h-screen">
        <ToastContainer/>
        {
          token !== "" ?
         <>
            <NavBar setToken={setToken}/>
            <hr />
            <div className="flex w-full">
             <SideBar/>
             <div className="w-4/6 mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base ">
               <Routes>
                  <Route path="/add" element={<Add token={token}/>}/>
                  <Route path="/list" element={<List token={token}/>}/>
                  <Route path="/orders" element={<Orders token={token}/>}/>
               </Routes>
             </div>
            </div>
        </> : 
        <Login setToken={setToken}/>
        }
        
      
       </div>
          
       
     )
   }
   
   export default App
