const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "test-db",
  password: "Tej4christ@4041",
  port: 5432,
});
// const getUsers = (request, response) => {
//   pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).json(results.rows);
//   });
// };

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUser = (data) => {
  try {
    const user = pool.query(
      "SELECT * FROM users WHERE name = $1",
      [data.name],
      (error, results) => {
        if (error) {
          throw error;
        }
        return results.rows;
      }
    );
    console.log("User", user);

    return user;
  } catch (err) {
    console.log("ERRRRRR", err.message);
    return { status: 404, message: "Internal server error" };
  }
};

const createTable = async () => {
  try {
    await pool.query(
      "CREATE TABLE users (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))"
    );
    console.log("Table created successfully");
  } catch (error) {
    console.log("ERRRRR", error.message);
  }
};

const getTable = async () => {
  try {
    const table = await pool.query(
      "SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users')"
    );
    return table.rows[0].exists;
  } catch (error) {
    console.log("ERRRRR", error.message);
  }
};

const createUser = async (data) => {
  const { name, email, id } = data;
  let res = null;
  try {
    const tableExists = await getTable();
    if (!tableExists) {
      await createTable();
      await pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [
        name,
        email,
      ]);
    } else {
      const user = await getUser({ name });
      console.log("User", user);
      if (!user) {
        const result = await pool.query(
          "INSERT INTO users (name, email) VALUES ($1, $2)",
          [name, email]
        );
        console.log("result", result);
        return { status: 201, message: "User created" };
      } else {
        return { status: 400, message: "User already exists" };
      }
    }
  } catch (err) {
    console.log("ERRRRRR", error.message);
    return { status: 500, message: "Internal server error" };
  }
};

// const updateUser = (request, response) => {
//   const id = parseInt(request.params.id);
//   const { name, email } = request.body;

//   pool.query(
//     "UPDATE users SET name = $1, email = $2 WHERE id = $3",
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).send(`User modified with ID: ${id}`);
//     }
//   );
// };

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id);

//   pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
//     if (error) {
//       throw error;
//     }
//     response.status(200).send(`User deleted with ID: ${id}`);
//   });
// };

module.exports = {
  //   getUsers,
  //   getUserById,
  createUser,
  //   updateUser,
  //   deleteUser,
};
