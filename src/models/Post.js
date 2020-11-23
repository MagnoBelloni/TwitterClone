const mongoose = require('mongoose')

const { Schema, Types: { ObjectId } } = mongoose

const PostsSchema = new Schema({
    content: { type: String, required: true },
    user: { type: String, required: true },
    create_date: { type: Date, required: true },
    visible: { type: Boolean, default: true },
    likes: [{ type: ObjectId, ref: 'users' }],
    replies: [this]
})

module.exports = mongoose.model('posts', PostsSchema)