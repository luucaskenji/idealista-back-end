const Label = require('../models/Label');
const Task = require('../models/Task');
const labelsSchemas = require('../schemas/labelsSchemas');

async function getLabels(req, res) {
    const labels = await Label.getAll();

    res.status(200).send(labels);
}

async function postLabel(req, res) {
    const { color } = req.body;

    if (!color) res.sendStatus(400);

    if (labelsSchemas.newLabel.validate(req.body).error) return res.sendStatus(422);

    const newLabel = await Label.postInDB(color);

    res.status(201).send(newLabel);
}

async function toggleTaskLabel(req, res) {
    let { taskId, labelId } = req.params;
    [taskId, labelId] = [parseInt(taskId), parseInt(labelId)];

    const requiredTask = await Task.verifyIfTaskExists(taskId);
    const requiredLabel = await Label.verifyIfLabelExists(labelId);
    if (!requiredTask || !requiredLabel) return res.sendStatus(404);

    const requiredTaskAndLabel = await Label.verifyIfLabelIsSet(taskId, labelId);

    if (requiredTaskAndLabel) {
        await Label.deleteLabel(taskId, labelId);
    }
    else {
        await Label.setLabel(taskId, labelId);
    }
}

module.exports = { postLabel, getLabels, toggleTaskLabel };