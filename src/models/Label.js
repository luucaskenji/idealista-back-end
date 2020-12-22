const connection = require("../database");

class Label {
    static tableName = 'labels';

    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    static async postInDB(color) {
        const result = await connection.query(`INSERT INTO ${this.tableName} (color) VALUES ($1) RETURNING *`, [color]);
        const newLabel = result.rows[0];
    
        return new Label(newLabel.id, newLabel.color);
    }
}

module.exports = Label;