const Task = require("../models/Task");

async function postTask(req, res) {
  const { name } = req.body;

  if (!name) return res.sendStatus(422);

  const newTask = await Task.postInDB(name);

  res.status(201).send(newTask);
}

async function getTasks(req, res) {
  const tasks = await Task.getAll();

  res.status(200).send(tasks);
}

module.exports = { postTask, getTasks };
