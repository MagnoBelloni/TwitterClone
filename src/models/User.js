const mongoose = require('mongoose')

const { Schema, Types: { ObjectId } } = mongoose

const User = new Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    bio: { type: String, required: true },
    user: { type: String, required: true },
    location: {
        lat: { type: String, required: true },
        lng: { type: String, required: true }
    },
    posts: [{ type: ObjectId, ref: 'posts' }],
    followers: [this],
    following: [this],
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile_pic: { type: String, required: true },
    birth_date: { type: Date, required: true }
})

module.exports = mongoose.model('users', User)