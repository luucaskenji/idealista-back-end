const joi = require('joi');

const task = joi.object({
    name: joi.string().pattern(/^[a-zA-Z0-9à-úÀ-Ú\s\,\.\;\!\(\)]+$/).required()
});

module.exports = { task }