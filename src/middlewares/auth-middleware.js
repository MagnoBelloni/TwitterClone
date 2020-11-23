const jwt = require('jsonwebtoken')

const excludeUrls = ['/login', '/users']

const AuthMiddleware = (req, res, next) => {
    try {
        if (excludeUrls.includes(req.path)) {
            next()
        } else {
            const authHeader = req.headers.authorization

            if (!authHeader) {
                throw Error('Você deve se autenticar para acessar essa rota')
            }

            const [, token] = authHeader.split(' ')

            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            if (!decoded) {
                throw Error('Token invalido')
            }

            req.decoded = decoded

            next()
        }
    } catch (error) {
        console.log(error);
        res.HandleHttpError({ message: error.message, status: 401 })
    }

}

module.exports = AuthMiddleware