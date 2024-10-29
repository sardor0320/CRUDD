import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [prePassword, setPrePassword] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== prePassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://64.226.108.80:8090/auth/register", {
        firstname,
        lastname,
        userName: username, // Ensure this matches the API's expected field name
        password,
        prePassword, // Ensure this is actually required by the API
        fileId: 0,
      });
      
      if (res.data.success) {
        setRegisterSuccess(true);
        alert('Yaxshi')
        navigate("/login");
      } else {
        setRegisterSuccess(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h1>

        <input
          type="text"
          placeholder="Firstname"
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        />

        <input
          type="text"
          placeholder="Lastname"
          onChange={(e) => setLastname(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        />

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setPrePassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition duration-150 ease-in-out"
        >
          Register
        </button>

        {registerSuccess === true && (
          <div className="mt-4 flex items-center p-4 text-gray-500 bg-green-100 rounded-lg shadow">
            <span>Registration successful! You can now login.</span>
          </div>
        )}

        {registerSuccess === false && (
          <div className="mt-4 flex items-center p-4 text-gray-500 bg-red-100 rounded-lg shadow">
            <span>Registration failed! Please try again.</span>
          </div>
        )}

        <p className="mt-4 text-center">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}
