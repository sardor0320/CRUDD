import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formdata, setFormData] = useState({
    login: "",
    password: "",
  });
  const [loginSuccess, setLoginSuccess] = useState(null); // null: no toast, true: success, false: error
  const navigate = useNavigate(); // for redirecting users

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://64.226.108.80:8090/auth/login", formdata);

      if (res.data.success) {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("role", res.data.role);
        setLoginSuccess(true);
        localStorage.setItem('token', res.data.token)
        // Redirect based on role
        if (res.data.role === "ROLE_BUYER") {
          navigate("/table");
        } else if (res.data.role === "ROLE_ADMIN") {
          navigate("/table");
        } else  {
          navigate("/table"); // Default redirect for other roles
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginSuccess(false); // Login failed
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h1>
        <input
          type="text"
          name="login"
          value={formdata.login}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          name="password"
          value={formdata.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Login
        </button>

        {/* Success Toast */}
        {loginSuccess === true && (
          <div
            id="toast-success"
            className="mt-4 flex items-center p-4 text-gray-500 bg-green-100 rounded-lg shadow dark:text-gray-400 dark:bg-green-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="sr-only">Check icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">Login successful!</div>
          </div>
        )}

        {/* Error Toast */}
        {loginSuccess === false && (
          <div
            id="toast-danger"
            className="mt-4 flex items-center p-4 text-gray-500 bg-red-100 rounded-lg shadow dark:text-gray-400 dark:bg-red-800"
            role="alert"
          >
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
            <div className="ml-3 text-sm font-normal">Login failed!</div>
          </div>
        )}
      </div>
    </div>
  );
}
