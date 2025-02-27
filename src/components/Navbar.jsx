import React from 'react'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout =()=>{
        localStorage.removeItem("authToken");
        const token = localStorage.getItem("authToken")
        if(token){
        navigate("/home");
        }
        else{
          navigate("/login")
        }
      }
  return (
    <div  className="bg-blue-800  shadow-lg ">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" >
            
            <span className="ml-2 text-xl font-bold text-white">LogisticsPro</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar