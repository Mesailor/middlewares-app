const { User } = require('../models/users');

module.exports = async function (req, res, next) {
    const username = req.get('x-user-name');

    const user = await User.findOne({ name: username });
    if (!user) {
        return res.status(400).send("No user with this name!");
    }
    req.context = user;
    next();
}