const express = require('express');
const {signup, signin,getUser, logout } = require('../controller/authController');
const jwtAuth = require('../middlware/jwtAuth');

const authRouter = express.Router();

authRouter.post('/signup',signup)     // post is mainly used for 2 purpose : 1. secure data pass 2. create something
authRouter.post('/signin',signin) 
authRouter.get('/getUser',jwtAuth, getUser)    // go through middleware
authRouter.get('/logout',jwtAuth,logout)    // user must be login to logout

module.exports = authRouter;