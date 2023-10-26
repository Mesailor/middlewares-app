const jwt = require('jsonwebtoken');
const { User } = require('../models/users');

module.exports = async function (req, res, next) {
    const token = req.get('x-user-token');

    if (!token) {
        return res.send('Redirecting to authentication page...');
    }
    try {
        const decoded = jwt.verify(token, 'jwtPrivatKey');
        const user = await User.findOne({name: decoded.name});
        res.set('x-auth-as', user.name);
        next();
    }
    catch (err) {
        res.status(400).send(err);
    }
}