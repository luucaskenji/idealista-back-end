const Task = require("../models/Task");

async function postTask(req, res) {
  const { name } = req.body;

  if (!name) return res.sendStatus(422);

  // pegar o retorno do banco
  const newTask = await Task.postInDB(name);
  // retornar 201
  res.status(201).send(newTask);
}

// async function deleteArticle(req, res) {
//   const { id } = req.params;
//   try {
//     const article = new Article(id);
//     await article.destroy();
//     return res.sendStatus(200);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).send(err);
//   }
// }

module.exports = { postTask };
