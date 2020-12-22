const Task = require('../models/Task');
const tasksSchemas = require('../schemas/tasksSchemas');

async function postTask(req, res) {
  const { name } = req.body;

  if (!name) return res.sendStatus(400);

  const { error } = tasksSchemas.newTask.validate(req.body);

  if (error) return res.status(422).send(error.details[0].message);

  const newTask = await Task.postInDB(name);

  res.status(201).send(newTask);
}

async function getTasks(req, res) {
  const tasks = await Task.getAll();

  res.status(200).send(tasks);
}

async function editTask(req, res) {
  let { id } = req.params;
  if (!id) return res.status(400);

  id = parseInt(id);
  
  const requiredTask = await Task.verifyIfTaskExists(id);
  if (!requiredTask) return res.sendStatus(404);

  const { name, description, isChecked } = req.body;

  // the last condition avoids conflicts when isChecked === false. The whole condition would be correct whithout it.
  if (!name && !description && !isChecked && isChecked !== false) return res.sendStatus(400);

  const { error } = tasksSchemas.updateTask.validate(req.body);
  if (error) return res.status(422).send(error.details[0].message);

  const updatedTask = await Task.updateTaskById(req.body, id);

  res.status(200).send(updatedTask);
}

async function deleteTask(req, res) {
  let { id } = req.params;
  if (!id) return res.status(400);

  id = parseInt(id);
  
  const requiredTask = await Task.verifyIfTaskExists(id);
  if (!requiredTask) return res.sendStatus(404);

  await Task.destroyTask(id);

  res.sendStatus(200);
}

module.exports = { postTask, getTasks, editTask, deleteTask };
