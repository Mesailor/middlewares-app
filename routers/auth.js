const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models/users');
const router = express.Router();

router.post('/', async (req, res) => {
    const username = req.body.name;
    const password = req.body.password
    const user = await User.findOne({name: username});

    if (!user) {
        return res.status(400).send('Wrong password or username');
    }
    if (password !== user.password) {
        return res.status(400).send('Wrong password or username');
    }

    const jwtuser = {
        name: user.name,
        _id: user._id
    }
    const token = jwt.sign(jwtuser, 'jwtPrivatKey');
    res.set('x-user-token', token);
    res.send('Authenticated succesfull!');
});

module.exports = router;