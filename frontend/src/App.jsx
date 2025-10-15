import React, { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [notification, setNotification] = useState(null);

  const limit = 5;

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/tasks?page=${page}&limit=${limit}&search=${search}&filter=${filter}`
      );
      const data = await res.json();
      setTasks(data.data);
      setTotal(data.total);
    } catch (err) {
      console.error(err);
      showNotification("error", "Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, filter]);

  const addTask = async () => {
    if (!title.trim()) return showNotification("error", "Title is required");
    try {
      const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!res.ok) throw new Error("Failed to add task");
      setTitle("");
      fetchTasks();
      showNotification("success", "Task added successfully!");
    } catch (err) {
      console.error(err);
      showNotification("error", err.message);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      fetchTasks();
      showNotification(
        "success",
        `Task "${task.title}" marked ${task.completed ? "pending" : "complete"}`
      );
    } catch (err) {
      console.error(err);
      showNotification("error", err.message);
    }
  };

  const deleteTask = async (task) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${task.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      fetchTasks();
      showNotification("success", `Task "${task.title}" deleted`);
    } catch (err) {
      console.error(err);
      showNotification("error", err.message);
    }
  };

  const editTask = async (id, updated) => {
    if (!updated.title.trim())
      return showNotification("error", "Title is required");
    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update task");
      fetchTasks();
      showNotification("success", "Task updated successfully");
    } catch (err) {
      console.error(err);
      showNotification("error", err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 relative">
      {/* 🔔 Notification Toast */}
      {notification && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white z-50 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification.message}
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      {/* Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task"
        />
        <button className="bg-blue-500 text-white px-4" onClick={addTask}>
          Add
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => toggleComplete(task)}
            onDelete={() => deleteTask(task)}
            onEdit={(updated) => editTask(task.id, updated)}
          />
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border px-2"
        >
          Prev
        </button>
        <span>
          Page {page} / {Math.ceil(total / limit)}
        </span>
        <button
          disabled={page * limit >= total}
          onClick={() => setPage(page + 1)}
          className="border px-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
