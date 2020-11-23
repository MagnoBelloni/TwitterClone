const PostServices = require('../services/posts.service')

module.exports = {
    async create(req, res) {
        try {
            const { body } = req
            const { user } = body

            const response = await PostServices.create(body, user)

            res.send(response)
        } catch (error) {
            res.HandleHttpError(error)
        }
    },
    async likes(req, res) {
        try {
            const { id } = req.params
            const { id: idUser } = req.decoded
            const response = await PostServices.like(id, idUser)

            res.send(response)
        } catch (error) {
            res.HandleHttpError(error)
        }
    },
    async reply(req, res) {
        try {
            const { id } = req.params
            const { body } = req
            const response = await PostServices.reply(id, body)

            res.send(response)
        } catch (error) {
            res.HandleHttpError(error)
        }
    },
    async replies(req, res) {
        try {
            const { id } = req.params
            const response = await PostServices.replies(id)
            res.send(response)
        } catch (error) {
            res.HandleHttpError(error)
        }
    },
    async getFeed(req, res) {
        const { id: idUser } = req.decoded

        try {
            const response = await PostServices.getFeed(idUser)

            res.send(response)
        } catch (error) {
            res.HandleHttpError(error)
        }
    }
}