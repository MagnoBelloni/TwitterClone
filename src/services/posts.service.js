const PostsModel = require('../models/Post')
const UserModel = require('../models/User')
const mongoose = require('mongoose')

module.exports = {
    async create(data, user) {

        if (!data.content) {
            throw new Error('O content, não existe')
        }

        const post = { ...data, create_date: new Date() }

        const postInstance = new PostsModel(post)

        const response = await postInstance.save()

        const postedByUser = await UserModel.findOneAndUpdate({ user }, { $push: { posts: response._id } })

        return { ...response, user: postedByUser }
    },
    like(idPost, idUser) {
        return PostsModel.findByIdAndUpdate(idPost, { $push: { likes: idUser } })
    },
    async reply(id, data) {
        const post = { ...data, create_date: new Date() }

        const postReply = await PostsModel.create(post)

        const { _id } = postReply

        return await PostsModel.findByIdAndUpdate(id, { $push: { replies: _id } })
    },
    replies(id) {
        return PostsModel.findById(id).populate('replies').select('replies')
    },
    getFeed(id) {
        return UserModel.aggregate([
            { $match: { _id: mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'following',
                    foreignField: '_id',
                    as: 'following'
                }
            },
            { $unwind: '$following' },
            { $replaceRoot: { newRoot: '$following' } },
            {
                $lookup: {
                    from: 'posts',
                    localField: 'posts',
                    foreignField: '_id',
                    as: 'posts'
                }
            },
            { $project: { age: 0, bio: 0, email: 0, password: 0, followers: 0 } },
            { $unwind: '$posts' },
            { $replaceRoot: { newRoot: { $mergeObjects: ["$posts", "$$ROOT"] } } },
            { $project: { posts: 0 } }
        ])
    }
}