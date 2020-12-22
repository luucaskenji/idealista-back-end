const Label = require('../models/Label');
const labelsSchemas = require('../schemas/labelsSchemas');

async function postLabel(req, res) {
    const { color } = req.body;

    if (!color) res.sendStatus(400);

    if (labelsSchemas.newLabel.validate(req.body).error) return res.sendStatus(422);

    const newLabel = await Label.postInDB(color);

    res.status(201).send(newLabel);
}

module.exports = { postLabel };