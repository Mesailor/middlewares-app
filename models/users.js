const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

const User = mongoose.model('User', userSchema);

function validate(user) {
    const schema = Joi.object({
        name: Joi.string().required(),
    });

    return schema.validate(user);
}

module.exports.validate = validate;
module.exports.User = User;