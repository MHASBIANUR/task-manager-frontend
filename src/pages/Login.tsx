import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async(e:any)=>{
    e.preventDefault();

    try{

      const res = await api.post("/users/login",{
        email,
        password
      })

      // simpan token
      localStorage.setItem("token",res.data.token)

      // simpan nama user
      localStorage.setItem("name",res.data.user.name)

      navigate("/dashboard")

    }catch(err){
      alert("Email atau password salah")
    }
  }

  return(

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-3xl shadow-xl p-10">

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-slate-700">
            Welcome Back
          </h2>

          <p className="text-slate-800 mt-2">
            Login to continue
          </p>

        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white py-3 rounded-xl font-medium"
          >
            Login
          </button>

        </form>

        <p className="text-sm text-center text-slate-500 mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-blue-500 font-medium ml-1 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  )
}