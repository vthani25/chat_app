import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";          // 👈 NEW
import assets from "../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");

  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login, authUser } = useContext(AuthContext);   
  const navigate = useNavigate();                        

  useEffect(() => {
    if (authUser) {
      navigate("/");  
    }
  }, [authUser, navigate]);

  /* Handle signup ⬅️➡️ login */
  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currentState === "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    /* Build the payload depending on mode */
    const creds =
      currentState === "Sign Up"
        ? { fullName, email, password, bio }
        : { email, password };

    login(currentState === "Sign Up" ? "signup" : "login", creds);
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      {/* Logo */}
      <img src={assets.logo} alt="" className="w-[min(30vw,250px)]" />

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isDataSubmitted && (
            <img
              onClick={() => setIsDataSubmitted(false)}
              src={assets.arrow_icon}
              alt=""
              className="w-5 cursor-pointer"
            />
          )}
        </h2>

        {/* Full name (signup step‑1) */}
        {currentState === "Sign Up" && !isDataSubmitted && (
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            placeholder="Full Name"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
          />
        )}

        {/* Email + password (both modes) */}
        {!isDataSubmitted && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email Address"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </>
        )}

        {/* Bio (signup step‑2) */}
        {currentState === "Sign Up" && isDataSubmitted && (
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Provide a short bio"
            required
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}

        {/* Submit button */}
        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer hover:opacity-90 transition-opacity duration-200"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>


        {/* Switch mode link */}
        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Create an account{" "}
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="font-medium text-violet-500 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
