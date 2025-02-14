const{SignupUser, SignIn, userSearch }= require('../controller/user-controller')

// import { SignIn, SignupUser } from '../controller/user-controller'
const AuthMiddleware = require('../utils/AuthMiddleware')
const express= require('express')
const router= express.Router()
router.post('/signup', SignupUser) 
router.post('/login', SignIn)
router.get('/search',AuthMiddleware,userSearch) 
module.exports = router