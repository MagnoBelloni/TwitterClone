const UserService = require('../services/user.service')

module.exports = {
    async create(req, res) {
        try {
            const { body } = req

            const respose = await UserService.create(body)

            delete respose.password
            res.send(respose)
        } catch (e) {
            console.log(e);
            res.HandleHttpError(e)
        }
    },
    async profile(req, res) {
        try {
            const { user } = req.params

            const response = await UserService.profile(user)

            res.send(response)
        } catch (error) {
            res.HandleHttpError(error)
        }
    },
    async login(req, res) {
        try {
            const { body } = req

            const respose = await UserService.login(body)

            res.send(respose)
        } catch (error) {
            res.HandleHttpError(error)
        }
    },
    async follow(req, res) {
        try {
            const { id } = req.params
            const { id: idUser } = req.decoded

            const response = await UserService.follow(id, idUser)

            res.send(response)
        } catch (error) {
            res.HandleHttpError(error)
        }
    }
}