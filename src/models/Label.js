const app = require("../app");
const connection = require("../database");

class Label {
    static tableName = 'labels';

    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    static async getAll() {
        const results = await connection.query(`SELECT * FROM ${this.tableName}`)
    
        return results.rows.map(r => new Label(r.id, r.color));
    }

    static async postInDB(color) {
        const result = await connection.query(`INSERT INTO ${this.tableName} (color) VALUES ($1) RETURNING *`, [color]);
        const newLabel = result.rows[0];
    
        return new Label(newLabel.id, newLabel.color);
    }

    static async verifyIfLabelExists(id) {
        const response = await connection.query(`SELECT * FROM ${this.tableName} WHERE id=$1`, [id]);
    
        return response.rows[0];
      }

    static async verifyIfLabelIsSet(taskId, labelId) {
        const response = await connection.query(
            `
                SELECT * FROM tasks_labels
                WHERE "taskId" = $1 AND "labelId" = $2
            `,
            [taskId, labelId]
        );
    
        return response.rows[0];
    }

    static async setLabel(taskId, labelId) {
        await connection.query('INSERT INTO tasks_labels ("taskId", "labelId") VALUES ($1, $2)', [taskId, labelId]);

        const response = await connection.query(
            `
                SELECT tasks_labels."labelId", labels.color FROM tasks_labels
                JOIN labels ON tasks_labels."labelId" = labels.id
                WHERE tasks_labels."taskId" = $1;
            `,
            [taskId]            
        );

        return response.rows.map(r => new Label(r.labelId, r.color));
    }

    static async deleteLabel(taskId, labelId) {
        await connection.query('DELETE FROM tasks_labels WHERE "taskId"=$1 AND "labelId"=$2', [taskId, labelId]);

        const response = await connection.query(
            `
                SELECT tasks_labels."labelId", labels.color FROM tasks_labels
                JOIN labels ON tasks_labels."labelId" = labels.id
                WHERE tasks_labels."taskId" = $1;
            `,
            [taskId]            
        );
        return response.rows.map(r => new Label(r.labelId, r.color));
    }
}

module.exports = Label;