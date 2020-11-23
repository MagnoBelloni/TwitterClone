const HandleHttpError = (req, res, next) => {
    res.HandleHttpError = ({ message, status = 500 }) => {
        res.status(status).send({ error: true, message: message })
    }

    next()
}

module.exports = HandleHttpError