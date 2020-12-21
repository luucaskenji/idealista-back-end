const connection = require("../database");

class Task {
  static tableName = 'tasks';

  constructor(id, name, isChecked) {
    this.id = id;
    this.name = name;
    this.isChecked = isChecked;
    this.labels = [];
  }
  
  static async postInDB(name) {
    const result = await connection.query(`INSERT INTO ${this.tableName} (name) VALUES ($1) RETURNING *`, [name]);
    const newTask = result.rows[0];

    return new Task(newTask.id, newTask.name, newTask.isChecked);
  }
}

module.exports = Task;