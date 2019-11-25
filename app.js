const path = require('path')
const cors = require('cors')
const logger = require('morgan')
const db = require('./models/db')
const express = require('express')
const cookieParser = require('cookie-parser')
const global = require('./helpers/global_helper')
const sessionStore = {

}

const app = express()
let appRoot = path.resolve(__dirname)

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'session_cookie_secret',
//     resave: false,
//     saveUninitialized: false
// }))

global(db, app, appRoot, express, sessionStore)
require('./util/swagger.util')
require('./middleware/pageable')
require('./middleware/router')