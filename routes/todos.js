const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new todo
router.post("/", async (req, res) => {
  const { kaam } = req.body;
  if (!kaam || kaam.trim() === "") {
    return res.status(400).json({ error: "Todo kaam required!" });
  }
  try {
    const newTodo = await Todo.create({ kaam: kaam.trim() });
    res.json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update todo text or completion
router.put("/:id", async (req, res) => {
  const { kaam, completed } = req.body;
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...(kaam !== undefined && { kaam: kaam.trim() }), ...(completed !== undefined && { completed }) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "حذف ہوگیا ✅" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;