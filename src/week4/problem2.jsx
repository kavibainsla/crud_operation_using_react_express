import express from "express";
const app = express();
const PORT = 3200;
app.use(express.json());

let students = [
  { id: 1, name: "Kavi", age: 21 }
];

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); 
};

app.use(logger);


const validateStudent = (req, res, next) => {
  const { name, age } = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: "Name and age are required" });
  }

  if (typeof age !== "number") {
    return res.status(400).json({ message: "Age must be a number" });
  }

  next(); 
};


app.post("/students", validateStudent, (req, res) => {
  const newStudent = {
    id: students.length + 1,
    name: req.body.name,
    age: req.body.age
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});


app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});