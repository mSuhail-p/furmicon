const express = require('express');
const router = express.Router();

const passport = require('passport');
require('../passport')
router.use(passport.initialize());
router.use(passport.session());




const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const cartController = require('../controllers/cartController')
const checkoutController = require('../controllers/checkoutController')
const wishlistController = require('../controllers/wishlistController')
const walletController = require('../controllers/walletController')
const coupenController = require('../controllers/coupenController')
const orderContrller = require('../controllers/orderController')

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
router.get('/login', userController.loadLogin)
router.post('/login', userController.verifiedLogin)
router.get('/home', auth.is_logout, auth.isAuthenticated, auth.is_blocked, userController.loadHome)
router.get('/categorySorting/:categoryId', auth.isAuthenticated, auth.is_blocked, userController.categorySorting)

//shop
router.get('/shop', auth.is_blocked, userController.shopProduct)
router.get('/sort/:method', auth.is_blocked, userController.sortProduct)
router.get('/searchProducts', auth.is_blocked, userController.searchProduct)

//OTP VERIFICATION
router.post('/verify', userController.verifyMail)
router.get('/resend', userController.resendOtp)


//product details
// router.get('/details',userController.productDetails)
router.get('/details/:product_id', auth.is_blocked, userController.productDetails)


//CART
router.get('/viewCart', auth.is_blocked, auth.cart, cartController.viewCart)
router.get('/addToCart/:productId/:quantity', auth.cart, cartController.addToCart)
router.patch('/removeCart/:productId', cartController.removeCart)
router.patch('/ProductQuantity', auth.cart, cartController.productQuantity)


//checkout
router.get('/getCheckout', auth.cart, checkoutController.getCheckout)
router.post('/placeOrder', auth.cart, checkoutController.placeOrder)
router.get('/orderPlaced/:orderId', auth.cart, checkoutController.orderPlaced)
router.post('/verifyPayment', auth.cart, checkoutController.verifyPayment)


//Coupen
router.get('/accessCoupon', coupenController.accessCoupen)



//userProfile
router.get('/userProfile', auth.authenticate, userController.userProfile)
router.post('/editProfile', auth.authenticate, userController.editProfile)
router.get('/userAddress', auth.authenticate, userController.addressLoad)
router.post('/addAddress', userController.addAddress)
router.get('/editAddress/:addressId', auth.authenticate, userController.getEditAddress)
router.post('/editAddress', userController.editAddress)
router.get('/deleteAddress/:addressId', userController.deleteAddress)
router.get('/changePassword', userController.changePassword)
router.post('/changePassword', userController.changinPassword)
router.get('/getOrder', auth.authenticate, userController.getOrder)
router.patch('/cancelOrder/:productId/:exactProductId/:orderId', userController.cancelOrder)
router.patch('/returnProduct', userController.returnProduct)
router.get('/signout', userController.signout)



//order

router.get('/getInvoice', orderContrller.getInvoice)

//WALLET
router.get('/getWallet', walletController.getWallet)



//wihslist
router.get('/wishlist', wishlistController.viewWishlist)
router.get('/addToWishlist/:productID', wishlistController.addToWishlist)
router.delete('/removeWishlist/:productId', wishlistController.removeWishlist)











module.exports = router
