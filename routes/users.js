const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../passport')
router.use(passport.initialize());
router.use(passport.session());




const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const cartController  = require('../controllers/cartController')
// const path=require('path');
// console.log("dira : ",__dirname);

//before login

router.get('/', auth.isAuthenticated, userController.loadHome)

//Auth google 
router.get('/auth/google', passport.authenticate('google', {
    scope:
        ['email', 'profile']
}))

//Auth Callback
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success'
    })
)
//google auth 

router.get('/success', userController.googleAuth)
 
//register

router.get('/signUp', userController.loadsignup)
router.post('/signUp', userController.insertUser)
router.get('/login',userController.loadLogin)
router.post('/login', userController.verifiedLogin)
router.get('/home', auth.is_logout, auth.isAuthenticated, auth.is_blocked, userController.loadHome)
 
//shop
router.get('/shop', auth.is_blocked, userController.shopProduct)

//OTP VERIFICATION
router.post('/verify', userController.verifyMail)
router.get('/resend', userController.resendOtp)


//product details
// router.get('/details',userController.productDetails)
router.get('/details/:product_id', auth.is_blocked, userController.productDetails)
router.get('/viewCart', auth.is_blocked, auth.cart,cartController.viewCart)
router.get('/addToCart/:productId/:quantity',auth.cart,cartController.addToCart)
router.patch('/removeCart/:productId',cartController.removeCart)



//userProfile
router.get('/userProfile',userController.userProfile)
router.post('/editProfile',userController.editProfile)


//wihslist
router.get('/wishlist',userController.viewWishlist)



 





 
module.exports = router
