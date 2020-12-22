const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const tasksController = require('./controllers/tasksController');
const labelsController = require('./controllers/labelsController');

app.post('/tasks', tasksController.postTask);
app.get('/tasks', tasksController.getTasks);
app.put('/tasks/:id', tasksController.editTask);
app.delete('/tasks/:id', tasksController.deleteTask);

app.post('/labels', labelsController.postLabel);
app.get('/labels', labelsController.getLabels);
app.post('/tasks/:taskId/labels/:labelId', labelsController.toggleTaskLabel);

module.exports = app;
