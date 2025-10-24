import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../components/ThemeContext.jsx";

export default function TaskManager() {
  const { theme } = useContext(ThemeContext);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("All");

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleComplete = id => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks =
    filter === "All" ? tasks : filter === "Active" ? tasks.filter(t => !t.completed) : tasks.filter(t => t.completed);

  return (
    <div className={`p-6 rounded-xl shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-500`}>
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="flex mb-4 space-x-2">
        <input
          className="flex-grow p-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          type="text"
          value={newTask}
          placeholder="Add a new task..."
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
        />
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <div className="flex space-x-4 mb-4">
        {["All", "Active", "Completed"].map(f => (
          <button
            key={f}
            className={`px-3 py-1 rounded ${
              filter === f ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            } transition`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} className="flex justify-between items-center mb-2 p-2 border-b border-gray-200 dark:border-gray-700">
            <span
              onClick={() => toggleComplete(task.id)}
              className={`flex-grow cursor-pointer ${task.completed ? "line-through text-gray-500 dark:text-gray-400" : ""}`}
            >
              {task.text}
            </span>
            <button className="text-red-500 hover:text-red-700" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 && <p className="text-gray-500 dark:text-gray-400 mt-4">No tasks to show.</p>}
    </div>
  );
}
