const UserModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const mongoose = require('mongoose')

const createToken = (payload) => {
    const { JWT_SECRET } = process.env

    return jwt.sign({
        iat: moment().unix(),
        exp: moment().add(1, 'day').unix(),
        id: payload._id
    }, JWT_SECRET)
}

module.exports = {
    async create(data) {
        const encryptedPassword = bcrypt.hashSync(data.password, 2)
        const user = { ...data, birth_date: new Date(), password: encryptedPassword }

        return await UserModel.create(user)
    }, async profile(user) {
        return await UserModel.aggregate([
            { $match: { user } },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'posts',
                    foreignField: '_id',
                    as: 'posts'
                }
            },
            { $unwind: "$posts" },
            { $project: { posts: 1, name: 1, user: 1, bio: 1, profile_pic: 1, post: "$posts", likes: { $size: "$posts.likes" } } },
            { $project: { posts: 0 } }
        ])
    }, async login(data) {
        const user = await UserModel.findOne({ email: data.email })

        if (!user) {
            throw new Error('Usuário não existe')
        }

        const passwordMatched = await bcrypt.compare(data.password, user.password)

        if (passwordMatched) {
            return { token: createToken(user) }
        } else {
            throw new Error('Senha incorreta')
        }
    }, async follow(id, idUser) {
        await UserModel.findByIdAndUpdate(id, { $push: { followers: mongoose.Types.ObjectId(idUser) } })

        return await UserModel.findByIdAndUpdate(idUser, { $push: { following: mongoose.Types.ObjectId(id) } })
    }
}