const joi = require('joi');

const newLabel = joi.object({
    color: joi.string().pattern(/^#(?:[0-9a-fA-F]{3}){1,2}$/).required()
});

module.exports = { newLabel };