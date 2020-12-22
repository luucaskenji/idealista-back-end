const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const tasksController = require('./controllers/tasksController');

app.post('/tasks', tasksController.postTask);
app.get('/tasks', tasksController.getTasks);
app.put('/tasks/:id', tasksController.editTask);

module.exports = app;
