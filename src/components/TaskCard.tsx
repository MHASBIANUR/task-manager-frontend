import { useState } from "react";
import api from "../services/api";

export default function TaskCard({ task, refresh }: any) {

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const toggleComplete = async () => {
    await api.put(`/tasks/${task.id}`, {
      title: task.title,
      completed: !task.completed
    });

    refresh();
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${task.id}`);
    refresh();
  };

  const updateTask = async () => {
    await api.put(`/tasks/${task.id}`, {
      title: title,
      completed: task.completed
    });

    setEditing(false);
    refresh();
  };

  return (

  <div className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition p-5 rounded-xl shadow-sm">

    {/* LEFT SIDE */}

    <div className="flex items-center gap-4">

      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleComplete}
        className="w-5 h-5 accent-blue-500 cursor-pointer"
      />

      {editing ? (

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

      ) : (

        <div>

          <p className={`font-medium ${
            task.completed
              ? "line-through text-gray-400"
              : "text-gray-800"
          }`}>
            {task.title}
          </p>

          <p className="text-xs text-gray-400">
            Today
          </p>

        </div>

      )}

    </div>


    {/* RIGHT SIDE */}

    <div className="flex items-center gap-4 text-sm">

      {editing ? (

        <button
          onClick={updateTask}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Save
        </button>

      ) : (

        <button
          onClick={() => setEditing(true)}
          className="text-blue-500 hover:text-blue-700 font-medium"
        >
          Edit
        </button>

      )}

      <button
        onClick={deleteTask}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        Delete
      </button>

    </div>

  </div>

);
}