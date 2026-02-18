const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];
let currentId = 1;

/**
 * 1. GET /tasks
 * Optional query: ?completed=true/false
 */
app.get("/tasks", (req, res) => {
  const { completed } = req.query;

  if (completed !== undefined) {
    const filteredTasks = tasks.filter(
      (task) => task.completed === (completed === "true")
    );
    return res.json(filteredTasks);
  }

  res.json(tasks);
});

/**
 * 2. GET /tasks/:id
 */
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
});

/**
 * 3. POST /tasks
 */
app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTask = {
    id: currentId++,
    title,
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

/**
 * 4. PUT /tasks/:id
 */
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;

  res.json(task);
});

/**
 * 5. DELETE /tasks/:id
 */
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  

  tasks.splice(taskIndex, 1);
  if(tasks.length===0){
    currentId = 1;
  }
  res.status(204).send();
});

const PORT = 5200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
