import { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [tasks, setTasks] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const getTasks = async () => {
    try {
      const res = await api.get("/tasks/my-tasks");
      setTasks(res.data.data);
    } catch (error) {
      console.log("Failed to fetch tasks");
    }
  };

  useEffect(() => {

    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("name");

    if (!token) {
      navigate("/");
      return;
    }

    if (userName) {
      setName(userName);
    }

    getTasks();

  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/");
  };

  const filteredTasks = tasks.filter((task:any) => {
    if (filter === "open") return !task.completed;
    if (filter === "closed") return task.completed;
    return true;
  });

  return (

  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex justify-center py-16">

  <div className="w-full max-w-3xl bg-slate-800/70 backdrop-blur rounded-3xl shadow-2xl border border-slate-700 p-10">


      {/* NAVBAR */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-xl font-semibold text-blue-500">
          Task Manager
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>

      {/* HEADER */}

      <div className="text-center mb-10">

        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome, {name} 👋
        </h2>

        <p className="text-gray-400">
          Here are your tasks for today
        </p>

      </div>

      {/* FILTER */}

      <div className="flex justify-center gap-4 mb-8">

        <button
          onClick={()=>setFilter("all")}
          className={`px-4 py-1 rounded-full text-sm ${
            filter==="all"
              ? "bg-blue-500 text-white font-medium"
              : "text-gray-500"
          }`}
        >
          All ({tasks.length})
        </button>

        <button
          onClick={()=>setFilter("open")}
          className={`px-4 py-1 rounded-full text-sm ${
            filter==="open"
              ? "bg-blue-500 text-white font-medium"
              : "text-gray-500"
          }`}
        >
          Open
        </button>

        <button
          onClick={()=>setFilter("closed")}
          className={`px-4 py-1 rounded-full text-sm ${
            filter==="closed"
              ? "bg-blue-500 text-white font-medium"
              : "text-gray-500"
          }`}
        >
          Closed
        </button>

      </div>

      {/* CREATE TASK */}

      <TaskForm refresh={getTasks}/>

      {/* TASK LIST */}

      {filteredTasks.length === 0 ? (
        <p className="text-center text-gray-400 mt-6">
          No tasks yet
        </p>
      ) : (
        <TaskList tasks={filteredTasks} refresh={getTasks}/>
      )}

    </div>

  </div>

);
}