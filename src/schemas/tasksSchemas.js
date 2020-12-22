const joi = require('joi');

const newTask = joi.object({
    name: joi.string().pattern(/^[a-zA-Z0-9à-úÀ-Ú\s\,\.\;\!\(\)]+$/).required()
});

const updateTask = joi.object({
    name: joi.string().pattern(/^[a-zA-Z0-9à-úÀ-Ú\s\,\.\;\!\(\)\?]+$/),
    description: joi.string().pattern(/^[a-zA-Zà-úÀ-Ú\s\,\.\;\!\(\)\?]+$/).min(5).max(150),
    isChecked: joi.boolean()
});

module.exports = { newTask, updateTask }