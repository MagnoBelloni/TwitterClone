const express = require('express')
const mongoConnector = require('./mongoose-conector')
const postsController = require('./src/controllers/posts.controller')
const postController = require('./src/controllers/posts.controller')
const userController = require('./src/controllers/user.controller')
const AuthMiddleware = require('./src/middlewares/auth-middleware')
const HandleHttpError = require('./src/middlewares/handle-http-error')

require('dotenv').config()

const app = express()

const { MONGO_URI, HTTP_PORT } = process.env
mongoConnector(MONGO_URI)

app.use(express.json())
app.use(HandleHttpError)
app.use(AuthMiddleware)

app.get('/', (req, res) => {
    return res.json({ message: 'Olá' })
})

app.post('/login', userController.login)
app.post('/users', userController.create)
app.post('/users/:id/follow', userController.follow)
app.get('/profile/:user', userController.profile)
app.post('/posts', postController.create)
app.post('/posts/:id/like', postController.likes)
app.post('/posts/:id/reply', postController.reply)
app.get('/posts/:id/replies', postController.replies)
app.get('/posts/feed', postsController.getFeed)

const port = HTTP_PORT || 3000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})