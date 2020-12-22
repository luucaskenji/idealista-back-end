const connection = require("../database");

class Task {
  static tableName = 'tasks';

  constructor(id, name, description, isChecked) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isChecked = isChecked;
    this.labels = [];
  }

  static async getAll() {
    const results = await connection.query(`SELECT * FROM ${this.tableName}`)

    return results.rows.map(r => new Task(r.id, r.name, r.description, r.isChecked));
  }
  
  static async postInDB(name) {
    const result = await connection.query(`INSERT INTO ${this.tableName} (name) VALUES ($1) RETURNING *`, [name]);
    const newTask = result.rows[0];

    return new Task(newTask.id, newTask.name, newTask.description, newTask.isChecked);
  }

  static async verifyIfTaskExists(id) {
    const response = await connection.query('SELECT * FROM tasks WHERE id=$1', [id]);

    return response.rows[0];
  }

  static async updateTaskById(newData, id) {
    let response;

    if (newData.name) {
      response = await connection.query(`UPDATE tasks SET name=$1 WHERE id=$2 RETURNING *`, [newData.name, id]);
    }
    else if (newData.description) {
      response = await connection.query(`UPDATE tasks SET description=$1 WHERE id=$2 RETURNING *`, [newData.description, id]);
    }
    else if (newData.isChecked) {
      response = await connection.query(`UPDATE tasks SET "isChecked"=$1 WHERE id=$2 RETURNING *`, [newData.isChecked, id]);
    }

    const updatedTask = response.rows[0];

    return new Task(updatedTask.id, updatedTask.name, updatedTask.description, updatedTask.isChecked);
  }
}

module.exports = Task;
