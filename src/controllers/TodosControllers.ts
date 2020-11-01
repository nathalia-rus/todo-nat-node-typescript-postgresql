import pool from "../dbconfig/dbconnector";

class TodosController {
  public async getAllTodos(req, res) {
    try {
      const client = await pool.connect();

      const sql = "SELECT * FROM todos";

      const { rows } = await client.query(sql);

      const todos = rows;

      client.release();

      console.log(" TODOS RECEIVED !!", todos);

      res.send(todos);
    } catch (error) {
      res.status(400).send(error);
    }
  }
}

export default TodosController;
