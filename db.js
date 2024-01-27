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

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

sequelize
  .query(
    "SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name='users' AND table_type='BASE TABLE'"
  )
  .then((tables) => {
    if (tables && tables.length > 0) {
      console.log("Users table exists in the database.");
    } else {
      console.log(
        "Users table does not exist in the database. Creating it now..."
      );
      return sequelize.query(createUserTableQuery);
    }
  })
  .then(() => {
    console.log("Table creation or existence check completed successfully.");
  })
  .catch((error) => {
    console.error("Error creating or checking users table:", error);
  });

module.exports = db;
