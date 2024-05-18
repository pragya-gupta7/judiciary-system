const User = require('../models/user.model');

const authorizeRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = User.findOne({username: req.body.username, password: req.body.password, type: req.body.type})
            if (user && user.type === role) {
                next();
            } else {
                return res.status(403).json({ message: 'Unauthorized' });
            }
        } catch (error) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
    };
};

module.exports = { authorizeRole };
