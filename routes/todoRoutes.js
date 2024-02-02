const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { addTodo, getTodos, updateTodo, deleteTodo } = todoController;

router.get("/get-todos", getTodos);
router.post("/add-todo", addTodo);
router.patch("/update-todo/:id", updateTodo);
router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;
