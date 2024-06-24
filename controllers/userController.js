const mongoose = require('mongoose')
const User = require('../model/userModel')
const OTP = require('../model/otp')
const Product = require('../model/product')
const Orders = require('../model/order')
const Category = require('../model/category')
const userAddress = require('../model/Address')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const Wallet = require('../model/walletModel')
const Return = require('../model/returnModel')




const securePassword = async (password) => {
    try {


        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash

    } catch (error) {
        console.log(error)
    }
}



//send mail
//  Function to Generator Otp :- ,

const generateOTP = (req, res) => {
    try {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];

        }


        return OTP;


    } catch (error) {
        console.log(error)
    }

}

const saveOtp = async (email, Otp) => {
    try {
        console.log("it is save otp " + email, Otp)
        const otp = new OTP({
            email: email,
            otp: Otp

        })

        const newOtp = await otp.save();
        console.log("new otp generated" + newOtp)
        // verifyMail(newOtp.otp)
        return newOtp;



    } catch (error) {
        console.log(error)
    }
}


const resendOtp = async (req, res) => {
    try {

        await OTP.deleteOne({ email: req.session.email })
        console.log("it is befor new otp")
        const newOtp = generateOTP();
        saveOtp(req.session.email, newOtp)
        const userdetails = await User.findOne({ email: req.session.email })
        // console.log(userdetails.usernamefsdfname)

        sendVerifyMail(userdetails.username, userdetails.email, userdetails._id, newOtp)






    } catch (error) {
        console.log(error)
    }
}


const sendVerifyMail = async (name, email, user_id, otpgener) => {
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'msuhailkzp@gmail.com',
                pass: 'uzea zvtv bjkd awty'

            }

        })



        const mailOption = {
            from: 'msuhailkzp@gmail.com',
            to: email,
            subject: 'For verfication mail ',

            // html:'<p>Hii '+name+', please check here to <a href="http://127.0.0.1:3000/verify?id='+user_id+'">Verify</a> your mail.</p>'
            html: '<p>Hii ' + name + ' Otp =' + otpgener + '</p>'



        }

        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error)
            } else {

                console.log("mail has been sent:- ", info.response);

            }
        })



    } catch (error) {
        console.log(error)
    }
}

const insertUser = async (req, res) => {
    try {

        // console.log(req.body.username+"it is user name")


        const is_already = await User.findOne({ email: req.body.email })

        if (is_already && is_already.email === req.body.email && is_already.is_verified) {

            res.render("user/signUp", { message: "This email is already registered. Please log in or reset your password if needed." })

        } else {


            const spassword = await securePassword(req.body.password);
            console.log(spassword);
            // const confirm = await bcrypt.compare(req.body.confirmpassword, spassword)
            // if (confirm) {




            const user = new User({

                username: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                password: spassword,
                is_admin: 0,


            })


            const userdata = await user.save();
            if (userdata) {

                const otpGenerate = generateOTP();

                req.session.otp = otpGenerate

                saveOtp(req.body.email, otpGenerate)
                req.session.email = req.body.email


                sendVerifyMail(req.body.name, req.body.email, userdata._id, otpGenerate)

                res.render('user/otp.ejs')
                //     res.render('user/home')
                // }else{
                //     res.render('user/login', {message:'Failed'})
                // }

            }


            // } else {
            //     res.render('user/login', { confirm: 'Confirm Password Incorrect' });
            // }    

        }

    } catch (error) {
        console.log(error)
    }
}

const verifiedLogin = async (req, res) => {
    try {


        const email = req.body.email;
        const password = req.body.password;

        // console.log(req.body.email, req.body.password + "data is coming")

        const userdata = await User.findOne({ email: email })
        console.log(userdata + "it is userdata");


        if (userdata != null) {

            if (userdata.is_blocked == false) {

                if (userdata && userdata.is_verified == 1) {

                    const passwordMatch = await bcrypt.compare(password, userdata.password);

                    if (passwordMatch) {
                        req.session.user_id = userdata._id;

                        // req.session.user_id
                        console.log("is is session code " + req.session.user_id)
                        res.redirect('/home')
                    } else {
                        res.render('user/login', { invalid: 'Invalid email and password, please try again' })
                    }

                } else {

                    res.render('user/login', { is_verified: 'Email is not verified,please check..' })
                }

            } else {
                res.render('user/login', { blockedUser: "Sorry, you are unable to login at this time. Please contact support for further assistance" })
            }

        } else {
            console.log("invalid email is working ")
            res.render('user/login', { emailverification: 'Sorry, Invalid Email address, please check..' })
        }




    } catch (error) {
        console.log(error);
    }
}






const loadHome = async (req, res) => {
    try {
        const product = await Product.find({ $and: [{ quantity: { $gt: 0 } }, { is_blocked: 1 }] }).sort({ date: -1 }).limit(12).populate('category')
        const category = await Category.find({})

        if (req.session.user_id) {
            const { user_id } = req.session
            res.render('user/home', { product, user_id, category })

        } else {

            res.render('user/home', { product, category })
        }

    } catch (error) {
        console.log(error)
    }
}




const categorySorting = async (req, res) => {
    try {
        const { categoryId } = req.params
        console.log(categoryId)
        console.log("it is category sorting")
        // const product
        const product = await Product.find({ category: categoryId }).populate('category')
        console.log(product);
        const category = await Category.find({})

        if (req.session.user_id) {
            const { user_id } = req.session
            res.render('user/home', { product, user_id, category })

        } else {

            res.render('user/home', { product, category })
        }

    } catch (error) {
        console.log('it is error for rendering categorySorting:', error)
    }
}

// const beforLogin = async (req, res) => {
//     try {

//         res.render('user/home.ejs')

//     } catch (error) {
//         console.log(error)
//     }
// }




const loadsignup = async (req, res) => {
    try {
        if (req.session.user_id) {

            res.redirect('/home')
        } else {

            res.render('user/signUp.ejs')


        }

    } catch (error) {
        console.log(error)
    }
}



const loadLogin = async (req, res) => {
    try {
        if (req.session.user_id) {

            res.redirect('/home')
        } else {

            res.render('user/login.ejs')


        }

    } catch (error) {
        console.log(error)
    }
}





const loadRegister = async (req, res) => {
    try {
        if (req.session.user_id) {
            res.redirect('/home')
        } else {

            res.render('user/login.ejs')
        }


    } catch (error) {
        console.log(error.message);
    }
}








const verifyMail = async (req, res) => {
    try {

        console.log("it is verify mail " + req.body.otp);


        const otpverify = await OTP.findOne({ email: req.session.email });

        // console.log("it is second" + otpverify.otp);
        // console.log("it is third" + req.body.otp);
        if (otpverify != null) {

            if (otpverify.otp == req.body.otp) {
                const updateInfo = await User.updateOne({ email: req.session.email }, { $set: { is_verified: 1 } })
                if (updateInfo) {

                    const userData = await User.findOne({ email: req.session.email })
                    console.log(userData._id, 'it is data')

                    //CREATING WALLET
                    let createWallet = new Wallet({
                        balance: 0,
                        userId: userData._id,
                    })
                    await createWallet.save()


                    //user has to login for enter to home  page
                    res.render('user/login.ejs', { afterOtp: 'Please Login' })
                }
            } else {
                const message = "Invalid otp, please check"
                res.render('user/otp', { message })

            }

        } else {
            console.log("here is reached")
            const expires = 'In valid otp, please check'
            res.render('user/otp', { expires })
        }

        // console.log(req.session.user_id)

        // console.log(updateInfo);
        // if(req.body.otp===)
        // console.log("it is otp form db" + req.body.email)

        // const savedotp = saveOtp()




    } catch (error) {
        console.log(`it is verify mail error${error}`);
    }
}




//SHOP ROUTE
const shopProduct = async (req, res) => {
    try {

        const productsFinding = await Product.find({}).populate({
            path: 'category',
            populate: {
                path: 'offer'
            }
        }).populate('offer')


        for (const element of productsFinding) {

            if (element.offer && element.category.offer) {

                let largeOffer = Math.max(element.offer.offPercentage, element.category.offer.offPercentage);
                let offerPrice = parseInt(element.price - (largeOffer / 100) * element.price)
                console.log(offerPrice, 'it is offer price')
                let addOfferPrice = await Product.updateOne({ _id: element._id }, { $set: { offerPrice: offerPrice } })

            } else if (element.offer) {
                let offerPrice = parseInt(element.price - (element.offer.offPercentage / 100) * element.price)
                console.log(offerPrice, 'it is offer only')
                await Product.updateOne({ _id: element._id }, { $set: { offerPrice: offerPrice } })

            } else if (element.category.offer) {
                let offerPrice = parseInt(element.price - (element.category.offer.offPercentage / 100) * element.price)
                console.log(offerPrice, 'it is category offer only')
                await Product.updateOne({ _id: element._id }, { $set: { offerPrice: offerPrice } })
            } else {
                await Product.updateOne({ _id: element._id }, { $set: { offerPrice: element.price } })
            }
        }




        const filterdProducts = productsFinding.filter((element) => {
            return element.category.status === true && element.is_blocked === 1;
        })



        const page = parseInt(req.query.page) || 1;
        const limit = 8;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const products = filterdProducts.slice(startIndex, endIndex);
        const length = filterdProducts.length




        res.render('user/shop.ejs', { products, length });





    } catch (error) {
        console.log(error);

    }
}



const searchProduct = async (req, res) => {
    try {

        let searchString = req.query.search
        if (!searchString) {
            return res.status(400).json({ error: 'Search string is required' });
        }

        let searchNumber = parseInt(searchString, 10);

        let searchQuery = {
            $or: [
                { name: { $regex: new RegExp(searchString, 'i') } }
            ]
        };

        if (!isNaN(searchNumber)) {
            searchQuery.$or.push({ offerPrice: { $lt: searchNumber } });
        }

        let products = await Product.find(searchQuery).sort({ offerPrice: -1 }).populate({
            path: 'category',
            populate: {
                path: 'offer'
            }
        }).populate('offer')
        res.render('user/shop', { products, searchString })





    } catch (error) {

        console.log('error rendering search Products:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the search Products.' })

    }
}




const sortProduct = async (req, res) => {
    try {
        let method = req.params.method
        console.log(method, 'it is inside the metho')


        if (method == 'LowToHigh') {
            let ascending = await Product.find({}).sort({ price: 1 }).populate('category')
            console.log(ascending, 'it is also insidle the sorring')
            const products = ascending.filter((element) => {
                return element.category.status === true && element.is_blocked === 1;
            })
            res.render('user/shop', { products })
        } else if (method == 'HighToLow') {

            let ascending = await Product.find({}).sort({ price: -1 }).populate('category')
            console.log(ascending, 'it is also insidle the sorring')
            const products = ascending.filter((element) => {
                return element.category.status === true && element.is_blocked === 1;
            })
            res.render('user/shop', { products })

        } else if (method == 'A-Z') {

            let ascending = await Product.find({}).sort({ name: 1 }).populate('category')
            console.log(ascending, 'it is also insidle the sorring')
            const products = ascending.filter((element) => {
                return element.category.status === true && element.is_blocked === 1;
            })
            res.render('user/shop', { products })

        } else if (method == 'Z-A') {

            let ascending = await Product.find({}).sort({ name: -1 }).populate('category')
            console.log(ascending, 'it is also insidle the sorring')
            const products = ascending.filter((element) => {
                return element.category.status === true && element.is_blocked === 1;
            })
            res.render('user/shop', { products })

        }



    } catch (error) {
        console.log(error);

    }
}







const productDetails = async (req, res) => {
    try {


        const product_id = req.params.product_id

        console.log(product_id + "is product id ")


        let UserId = req.session.user_id
        const product = await Product.findOne({ _id: product_id }).populate({
            path: 'category',
            populate: {
                path: 'offer'
            }
        })


        console.log(product.price, product?.offer?.offPercentage, 'ifjsdkfl')


        let related = await Product.find({ category: product.category._id }).populate('category')
        console.log("..........." + related + "it is related ")

        console.log(product.images[1] + "it is images");

        res.render('user/product', { product, related, UserId })




    } catch (error) {
        console.log(error);

    }
}




const googleAuth = async (req, res) => {
    try {


        // let googleid =mongoose.createFromHexString(req.user.id)


        let googleId = req.user.id

        let usergoogle = await User.findOne({ googleId: googleId })



        if (usergoogle) {

            req.session.user_id = usergoogle._id
            console.log('it is inside of the existing googleauth')
            res.redirect('/')

        } else {
          

            const googleRegister = new User({
                username: req.user.name.givenName,
                email: req.user.email,
                googleId: req.user.id,
                is_verified: 1
            })

 
            let googledoc = await googleRegister.save()

            //create wallet

            let createWallet = new Wallet({
                balance: 0,
                userId: googledoc._id,
            })
            await createWallet.save()
            // req.session.user_id = req.user._id
            req.session.user_id = googledoc._id
            console.log(req.session.user_id)
            res.redirect('/')
        }





    } catch (error) {
        console.log(error)
    }
}


let viewWishlist = async (req, res) => {
    try {

        res.render('user/wishlist')


    } catch (error) {
        console.log('error rendering wishlist:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the wishlist.' });
    }
}







let userProfile = async (req, res) => {

    try {

        let userId = req.session.user_id;

        let userDocument = await User.findOne({ _id: userId })

        res.render('user/userProfile', { userDocument })

    } catch (error) {

        console.log('error rendering userProfile:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the wishlist.' })
    }

}


let editProfile = async (req, res) => {

    try {
        console.log("staring")
        let userId = req.session.user_id
        let name = req.body.name
        let email = req.body.email
        let mobile = req.body.mobile
        console.log(name + "it is form data")
        console.log(email + "it is form data")
        console.log(mobile + "it is form data")

        let userDocument = await User.updateOne({ _id: userId }, {
            $set: {

                username: name,
                email: email,
                mobile: mobile

            }
        }, { upsert: true })

        console.log(userDocument, "it is updtaed thing")
        res.redirect('/userProfile')



    } catch (error) {

        console.log('error rendering userProfile:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the wishlist.' })
    }

}


let addressLoad = async (req, res) => {
    try {

        let allAddresses = await userAddress.find({ userId: req.session.user_id })

        if (allAddresses.length > 0) {
            res.render('user/userAddress', { allAddresses })

        } else {

            res.render('user/userAddress')
        }

    } catch (error) {
        console.log('error rendering userAddress:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the userAddress.' })

    }
}



let addAddress = async (req, res) => {
    try {

        console.log('it is add address')

        let { fname, lname, street, country, state, town, pin, mobile, email } = req.body
        console.log(req.body, 'is req.body')

        let addToAddress = new userAddress({
            userId: req.session.user_id,
            firstName: fname,
            lastName: lname,
            country: country,
            streetName: street,
            town: town,
            state: state,
            postCode: pin,
            phone: mobile,
            email: email


        })

        let storedAddress = await addToAddress.save()


        res.redirect('/userAddress')



    } catch (error) {
        console.log('error rendering userAddress:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the userAddress.' })

    }
}



let changePassword = async (req, res) => {
    try {

        res.render('user/changePassword')


    } catch (error) {
        console.log('error rendering ChangePassword:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the userAddress' })
    }
}

let changinPassword = async (req, res) => {
    try {
        console.log("changin paassword");
        let currentPassword = req.body.currentPass;
        let newPassword = req.body.newPass;
        let confirmPassword = req.body.confirmpass;
        let userDetails = await User.findOne({ _id: req.session.user_id });

        if (userDetails.password) {
            const passwordMatch = await bcrypt.compare(currentPassword, userDetails.password);
            if (passwordMatch) {
                console.log("it is inside the password match");
                if (newPassword === confirmPassword) {
                    let encripted = await securePassword(newPassword);
                    console.log(encripted, "it is encripted");
                    let updatingPassword = await User.updateOne({ _id: req.session.user_id }, { $set: { password: encripted } });
                    console.log(updatingPassword);
                    res.render('user/changePassword', { success: true });
                } else {
                    res.render('user/changePassword', { notConfirm: 'Password Confirmation Failed' });
                }
            } else {
                console.log("else of the current match");
                res.render('user/changePassword', { wrongPassword: 'The current password you provided does not match our records' });
            }
        } else {
            res.render('user/changePassword', { message: 'You cannot change your password on this website because you are logged in using your Google account' });
        }
    } catch (error) {
        console.log('error rendering ChangePassword:', error);
        res.status(500).render('error', { error: 'An error occurred while rendering the userAddress' });
    }
};






const getEditAddress = async (req, res) => {

    try {

        const { addressId } = req.params
        const Address = await userAddress.findOne({ _id: addressId })
        console.log(Address)

        res.render('user/editAddress', { Address })




    } catch (error) {
        console.log('error rendering geteditAddress', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the  getEditAddress' })

    }
}






const editAddress = async (req, res) => {

    try {

        let { fname, lname, street, country, state, town, pin, mobile, email, id } = req.body
        const updateAddress = await userAddress.updateOne({ _id: id }, {
            $set: {
                firstName: fname,
                lastName: lname,
                country: country,
                streetName: street,
                town: town,
                state: state,
                postCode: pin,
                pbone: mobile,
                email: email

            }
        })

        res.redirect('/userAddress')



    } catch (error) {
        console.log('error rendering editAddress', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the signout' })

    }
}



const getOrder = async (req, res) => {

    try {

        const { user_id } = req.session
        const orders = await Orders.find({ userId: user_id }).populate({
            path: 'orderedProducts.productId',
            model: 'Product'
        }).sort({ orderedTime: -1 })

        res.render('user/orderHistory', { orders })



    } catch (error) {
        console.log('error rendering getOrder', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the orderpage' })


    }
}



let cancelOrder = async (req, res) => {
    try {
        const { productId, exactProductId, orderId } = req.params
        const { user_id } = req.session
        let orderToCancel = await Orders.findOne({ _id: orderId })
        // const userWallet = await Wallet.findOne({ userId: user_id })
        const product = await Product.findOne({ _id: exactProductId })
        console.log(product.offerPrice, 'it is offerprice')

        if (orderToCancel.paymentMethod == 'Online Payment' || orderToCancel.paymentMethod == 'Wallet') {
            console.log('insid the reached')
            await Wallet.updateOne(
                { userId: user_id },
                {
                    $inc: { balance: product.offerPrice },
                    $push: {
                        history: {
                            Date: new Date().toDateString(),
                            Description: `${product.name} cancelled`,
                            Amount: `+ ${product.offerPrice}`,
                            time: new Date()
                        }
                    }
                }
            );

        }

        let cancel = await Orders.updateOne(
            { userId: user_id, "orderedProducts._id": productId },
            {
                $set: { "orderedProducts.$.status": "Cancelled" }
            }
        );




        await Product.updateOne({ _id: exactProductId }, { $inc: { quantity: 1 } })
        console.log(cancel)

        let cancelled = true

        res.json({ cancelled })





    } catch (error) {
        console.log('error rendering cancelOrder:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the cancelOrder' })
    }
}







let returnProduct = async (req, res) => {
    try {

        let { reason, orderId, productId } = req.query
        console.log(reason, orderId, 'it is reason')
        let addReturn = new Return({
            orderId: orderId,
            reason: reason
        })
        await addReturn.save();

        let statusChange = await Orders.updateOne(
            { 'orderedProducts._id': productId }, // Find the document with the matching subdocument _id
            { $set: { 'orderedProducts.$.status': 'Returned' } } // Use the positional operator $ to update the status
        );


        console.log(statusChange)

        res.json({ status: true })





    } catch (error) {
        console.log('error rendering returnProduct:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the returnProduct' })
    }
}










const deleteAddress = async (req, res) => {

    try {
        const { addressId } = req.params
        const address = await userAddress.deleteOne({ _id: addressId })

        res.redirect('/userAddress')



    } catch (error) {
        console.log(error)


    }
}












let signout = async (req, res) => {
    try {


        req.session.user_id = null;
        res.redirect('/home')


    } catch (error) {
        console.log('error rendering signout:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the signouts' })
    }
}














module.exports = {
    loadsignup,
    loadLogin,
    loadHome,
    categorySorting,
    verifiedLogin,
    insertUser,
    verifyMail,
    shopProduct,
    searchProduct,
    sortProduct,
    loadRegister,
    resendOtp,
    // beforLogin
    productDetails,
    googleAuth,
    viewWishlist,
    userProfile,
    editProfile,
    addressLoad,
    addAddress,
    editAddress,
    getEditAddress,
    getOrder,
    deleteAddress,
    cancelOrder,
    returnProduct,
    changePassword,
    changinPassword,
    signout



} 