import React, { useState } from "react";
import Loader from './Loader.js'

import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstanceOf";
const RegisterPage = () => {
const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleLogin=()=>{
    navigate("/login")
  }

  // Function to check if user already exists and register the new user
  const handleRegister = async (event) => {
    event.preventDefault();
    // Clear previous messages
    setError("");
    setSuccess("");
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
   
    try {
      // Register the new user if no existing user is found
      const registerResponse = await axiosInstance.post("/api/user/register", {
        email,
        password,
      });
      console.log(registerResponse);
      

      if (registerResponse.data) {
        setSuccess("Registration successful! You can now log in.");
        console.log(success);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false)
        
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    }
  };


  return (
    <div className={`flex items-center justify-center h-screen `}>
      {
        isLoading && ( <Loader isLoading={isLoading} text={'Registering'}/> )
      }
      <form onSubmit={handleRegister} className={`w-full max-w-sm p-6 bg-white rounded-lg shadow-md ${isLoading && 'bg-slate-800/70'}`}>
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Show error message */}
        {success && <p className="text-green-500 mb-4">{success}</p>} {/* Show success message */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Confirm your password"
          />
        </div>

        <div className="flex flex-col">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>


        <p>Already have an account?</p>
          <button
            type="submit"
            className="text-blue-400 underline"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
