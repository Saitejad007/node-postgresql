const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const { addTodo, getTodos, deleteTodo } = todoController;

router.get("/get-todos", getTodos);
router.post("/add-todo", addTodo);
router.delete("/delete-todo/:id", deleteTodo);

module.exports = router;
