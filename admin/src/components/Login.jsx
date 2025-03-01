import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import {toast} from 'react-toastify';


function Login( {setToken}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); //button annimation state

  //hnadles the login form submission
  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      //API call to backend server
      const response = await axios.post(backendUrl + '/api/user/admin', {email, password});
      if(response.data.success) {
        setToken(response.data.token);
      }else {
        toast.error(response.data.message);

      }

    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
      // Reset form inputs after successful login
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4 "> Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2"> Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className={`mt-2 w-full py-2 px-4 rounded-md text-white bg-black transition-transform ${loading ? "scale-95 opacity-75": "hover:scale-105 active:scale-95 transition-all duration-200"}`}
            type="submit" disabled={loading} 
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
