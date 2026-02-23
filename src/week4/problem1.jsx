import express from "express";
const app = express();
const PORT = 3500;
app.use(express.json());

let students = [
  { id: 1, name: "ABCDE", age: 33, course: "english" },
  { id: 2, name: "XYZ", age: 55, course: "computer" }
];


let nextId = 3;

app.post("/students", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newStudent = {
    id: nextId++,
    name,
    age,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, course } = req.body;

  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  students[studentIndex] = {
    id,
    name,
    age,
    course
  };

  res.json(students[studentIndex]);
});

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const studentIndex = students.findIndex(s => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(studentIndex, 1);
  res.json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});