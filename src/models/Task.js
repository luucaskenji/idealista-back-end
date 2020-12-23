const connection = require("../database");

class Task {
  static tableName = 'tasks';

  constructor(id, name, description, isChecked, labels) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isChecked = isChecked;
    this.labels = labels;
  }

  static async getAll() {
    const results = await connection.query(`SELECT * FROM ${this.tableName}`)

    return await Promise.all(results.rows.map(async r => {
      const response = await connection.query(
        `
          SELECT tasks_labels."labelId" AS id, labels.color AS color FROM tasks
          JOIN tasks_labels ON tasks.id = tasks_labels."taskId"
          JOIN labels ON labels.id = tasks_labels."labelId"
          WHERE tasks_labels."taskId" = $1
        `,
        [r.id]
      );

      return new Task(r.id, r.name, r.description, r.isChecked, response.rows)
    }));
  }
  
  static async postInDB(name) {
    const result = await connection.query(`INSERT INTO ${this.tableName} (name) VALUES ($1) RETURNING *`, [name]);
    const newTask = result.rows[0];

    return new Task(newTask.id, newTask.name, newTask.description, newTask.isChecked, []);
  }

  static async verifyIfTaskExists(id) {
    const response = await connection.query(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);

    return response.rows[0];
  }

  static async updateTaskById(newData, id) {
    let response;

    if (newData.name) {
      response = await connection.query(`UPDATE ${this.tableName} SET name=$1 WHERE id=$2 RETURNING *`, [newData.name, id]);
    }
    else if (newData.description) {
      response = await connection.query(`UPDATE ${this.tableName} SET description=$1 WHERE id=$2 RETURNING *`, [newData.description, id]);
    }
    else if ("isChecked" in newData) { // if the same logic of other conditions was applied here, there would be conflicts when isChecked === false
      response = await connection.query(`UPDATE ${this.tableName} SET "isChecked"=$1 WHERE id=$2 RETURNING *`, [newData.isChecked, id]);
    }

    // getting labels list for the task    
    const results = await connection.query(
      `
        SELECT tasks_labels."labelId" AS id, labels.color AS color FROM tasks
        JOIN tasks_labels ON tasks.id = tasks_labels."taskId"
        JOIN labels ON labels.id = tasks_labels."labelId"
        WHERE tasks_labels."taskId" = $1
      `,
      [id]
    );

    const updatedTask = response.rows[0];

    return new Task(updatedTask.id, updatedTask.name, updatedTask.description, updatedTask.isChecked, results.rows);
  }

  static async destroyTask(id) {
    await connection.query(`DELETE FROM ${this.tableName} WHERE id=$1`, [id]);
  }
}

module.exports = Task;
