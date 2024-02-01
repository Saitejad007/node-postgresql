const db = require("../db");
const Todo = db.todos;

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json({ todos });
  } catch (err) {
    console.log(err);
  }
};

const addTodo = async (req, res) => {
  try {
    const { todo, userId } = req.body;
    console.log(req.body, "boddddy");
    const todoItem = await Todo.create({
      // todo_id: 1,
      comment: todo,
      completed: false,
      user_id: userId,
    });
    res.status(201).json({ todoItem });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todoItem = await Todo.destroy({ where: { todo_id: id } });
    res.status(200).json({ status: "ok", deleted_id: id });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addTodo, getTodos, deleteTodo };
