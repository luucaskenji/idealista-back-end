const Task = require('../models/Task');
const tasksSchemas = require('../schemas/tasksSchemas');

async function postTask(req, res) {
  const { name } = req.body;

  if (!name) return res.sendStatus(400);

  const { error } = tasksSchemas.task.validate(req.body);

  if (error) return res.status(422).send(error.details[0].message);

  const newTask = await Task.postInDB(name);

  res.status(201).send(newTask);
}

async function getTasks(req, res) {
  const tasks = await Task.getAll();

  res.status(200).send(tasks);
}

module.exports = { postTask, getTasks };
