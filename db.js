const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("test-db", "postgres", "Tej4christ@4041", {
  host: "localhost", // Change this to your server's IP or hostname
  port: 5432, // Change this to your PostgreSQL server's port
  dialect: "postgres",
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const db = {};
db.Sequelize = Sequelize;
db.users = require("./models/userModel")(sequelize, DataTypes);

connectDB();

module.exports = db;
