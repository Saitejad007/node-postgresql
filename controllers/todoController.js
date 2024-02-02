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
      comment: todo,
      completed: false,
      user_id: userId,
    });
    res.status(201).json({ todoItem });
  } catch (err) {
    console.log(err);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    console.log("boduuu", req.body);
    const todoItem = await Todo.findByPk(id);
    if (!todoItem) return res.status(404).send({ message: "Todo not found" });
    todoItem.comment = comment;
    await todoItem.save();
    res
      .status(200)
      .json({ status: "Update successful", ...todoItem.dataValues });
  } catch (err) {
    console.log(err, "ERRORR");
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

module.exports = { addTodo, getTodos, updateTodo, deleteTodo };
