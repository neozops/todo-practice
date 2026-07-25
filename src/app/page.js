"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("myTasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("myTasks", JSON.stringify(tasks));
    }
  }, [tasks, loaded]);

  function addTask() {
    if (input.trim() === "") return;
    setTasks([...tasks, input]);
    setInput("");
  }

  function deleteTask(indexToRemove) {
    setTasks(tasks.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>My To-Do List</h1>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a task"
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <button onClick={addTask} style={{ padding: "8px 16px" }}>
        Add Task
      </button>

      <ul style={{ marginTop: "20px", listStyle: "none", padding: 0 }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            {task}
            <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "12px", padding: "4px 10px" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}