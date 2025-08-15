"use client";

import { useState } from "react";
import { Post } from "@/hooks/apiUtils";
import { useAuth } from "@/context/AuthContext";
import { IoEye, IoEyeOff, IoLogInOutline } from "react-icons/io5";
import Image from "next/image";

const Login: React.FC = () => {
  const { token, login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: any = await Post(
        "/api/auth/admin/login",
        { email: email, password },
        5000
      );  
      if (response?.success) {
        const token = response?.data?.token;
        const adminDetails = response?.data?.data;
        login(token, adminDetails);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <>
      {!token && (
        <div className="relative min-h-screen flex flex-col justify-center items-center bg-[#191970]/5">
          {/* Video Background */}
          {/* Background Image */}
          {/* <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center "
            // style={{
            //   backgroundImage: "url('/assets/bg/SILK.svg')",
            // }}
          ></div> */}

          {/* Overlay for better readability */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/0"></div>

          {/* Glassmorphic Form Container */}
          <div className="relative bg-white/2 backdrop-blur-sm bg-black/0 shadow-x text-black p-8 rounded-xl max-w-md w-full">
            {/* Logo */}
            <div className="text-center mb-6">
              <Image
                src="/assets/bg/rclogo.png"
                alt="logo"
                width={250}
                height={150}
                priority
                unoptimized
                className="mx-auto h-32 object-fill"
              />
            </div>
            <h2 className="text-black text-center text-2xl font-semibold mb-6">
              Welcome To Ranas International
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-black text-sm mb-2">User Id</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your number"
                  required
                  className="w-full px-4 py-2 rounded-md bg-white/20 text-black border border-gray-400 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-black text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-2 rounded-md bg-white/20 text-blacck placeholder-gray-300 border border-gray-400 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <span
                    className="absolute top-3 right-3 cursor-pointer text-black"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <IoEye size={18} />
                    ) : (
                      <IoEyeOff size={18} />
                    )}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-md transition"
              >
                <IoLogInOutline size={20} />
                Proceed to Dashboard
              </button>
            </form>
          </div>

          <p className="text-black">© 2025 | Powered by Ranas International | Developed by VXTRY Industry</p>
        </div>
      )}
    </>
  );
};

export default Login;
