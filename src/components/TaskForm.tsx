import { useState } from "react";
import api from "../services/api";

export default function TaskForm({refresh}:any){

  const [title,setTitle] = useState("")

  const createTask = async(e:any)=>{
    e.preventDefault()

    if(!title) return

    await api.post("/tasks",{title})

    setTitle("")
    refresh()
  }

  return(

    <form onSubmit={createTask} className="flex gap-3 mb-8">

  <input
    type="text"
    placeholder="Create new task..."
    value={title}
    onChange={(e)=>setTitle(e.target.value)}
    className="flex-1 border border-gray-200 bg-gray-50 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
  />

  <button
    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition"
  >
    Add
  </button>

</form>

  )
}