const express = require("express");
const router = express.Router();
const Todo = require("./Todo");


router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/", async (req, res) => {
  try {
    const newTodo = new Todo({ text: req.body.text });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: "Error adding task" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const updateFields = {};
    if (req.body.text !== undefined) updateFields.text = req.body.text;
    if (req.body.completed !== undefined) updateFields.completed = req.body.completed;

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, updateFields, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Error updating task" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  }
});

module.exports = router;