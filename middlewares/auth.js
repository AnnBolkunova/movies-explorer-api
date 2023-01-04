const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return next(new UnauthorizedError('Необходима авторизация'));
    }

    const token = authorization.replace(/^Bearer\s/i, '');
    let payload;

    try {
        const { JWT_SECRET = 'dev-key' } = req.app.get('config');
        payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        throw (new UnauthorizedError('Необходима авторизация'));
    }
    req.user = payload;
    return next();
};
