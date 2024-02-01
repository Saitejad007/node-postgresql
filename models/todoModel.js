module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "todo",
    {
      todo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true, createdAt: "created_at", updatedAt: "updated_at" }
  );
  return Todo;
};
