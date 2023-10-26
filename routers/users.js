const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/users');
const getUserMiddleware = require('../middlewares/get_user');

router.get('/', getUserMiddleware, (req, res) => {
    return res.send(req.context);
});

router.post('/', async (req, res) => {
    const { error, value } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = new User({
        name: value.name,
        password: value.password
    });

    await user.save();
    return res.send(`User: ${user.get('name')}, id: ${user.get('_id')}`);
});

module.exports = router;