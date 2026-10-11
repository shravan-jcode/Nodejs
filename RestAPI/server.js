
const express = require("express");

const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Priya" }
];

// GET: Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// GET: Get one student
app.get("/students/:id", (req, res) => {
  const student = students.find(
    (s) => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.json(student);
});

// POST: Add a student
app.post("/students", (req, res) => {
  const newStudent = {
    id: Date.now(),
    name: req.body.name
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// PATCH: Update a student's name
app.patch("/students/:id", (req, res) => {
  const student = students.find(
    (s) => s.id === Number(req.params.id)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  student.name = req.body.name ?? student.name;

  res.json(student);
});

// DELETE: Remove a student
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex(
    (s) => s.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  students.splice(index, 1);

  res.json({ message: "Student deleted" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
