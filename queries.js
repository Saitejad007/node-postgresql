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

const getUser = async (data) => {
  try {
    const resp = await pool.query("SELECT * FROM users WHERE email = $1", [
      data.email,
    ]);

    return resp.rows;
  } catch (err) {
    console.log("ERRRRRR", err.message);
    return { status: 500, message: "Internal server error" };
  }
};

const createTable = async () => {
  try {
    await pool.query(
      "CREATE TABLE users (id SERIAL PRIMARY KEY, uid VARCHAR(255), name VARCHAR(255), email VARCHAR(255))"
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
  const { name, email, uid } = data;
  try {
    const tableExists = await getTable();
    if (!tableExists) {
      await createTable();
      await pool.query(
        "INSERT INTO users (uid, name, email) VALUES ($1, $2, $3)",
        [uid, name, email]
      );
      return { status: 201, message: "User created" };
    } else {
      const users = await getUser({ email });
      console.log(users);
      if (users.length == 0) {
        await pool.query(
          "INSERT INTO users (uid, name, email) VALUES ($1, $2, $3)",
          [uid, name, email]
        );
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
