const mongoose = require('mongoose')
const User = require('../model/userModel')
const OTP = require('../model/otp')
const Product = require('../model/product')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');



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
                        console.log("it is one");
                        console.log(passwordMatch);
                        console.log("it is two");
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
        const product = await Product.find({}).populate('category')

        if (req.session.user_id) {

            console.log("first")
            res.render('user/home', { product })

        } else {
            console.log("second")
            res.render('user/home', { product })
        }

    } catch (error) {
        console.log(error)
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

        console.log("it is second" + otpverify.otp);
        console.log("it is third" + req.body.otp);


        if (otpverify.otp == req.body.otp) {
            const updateInfo = await User.updateOne({ email: req.session.email }, { $set: { is_verified: 1 } })
            if (updateInfo) {
                //user has to login for enter to home  page
                res.render('user/login.ejs', { afterOtp: 'Please Login' })
            }
        } else {
            const message = "Invalid otp, please check"
            res.render('user/otp', { message })

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

        // const userData = await User.findOne({_id:req.session.user_id});
        // console.log(userData+"it is from shop")




        const productsFinding = await Product.find({}).populate('category')
        // console.log(productsFinding[0].category._id); 

        console.log(productsFinding + "it cheching of the category")
        const products = productsFinding.filter((element) => {
            return element.category.status === true && element.is_blocked === 1;
        })

        // console.log("products " + products)

        // console.log(products)

        console.log("shop is working")

        res.render('user/shop.ejs', { products });





    } catch (error) {
        console.log(error);

    }
}


const productDetails = async (req, res) => {
    try {


        const product_id = req.params.product_id

        console.log(product_id + "is product id ")



        const product = await Product.findOne({ _id: product_id }).populate('category');
        const related = await Product.find({ category: product.category._id }).populate('category')
        console.log("..........." + related + "it is related ")

        console.log(product.images[1] + "it is images");

        res.render('user/product', { product, related })




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
            console.log(req.user.name.givenName)
            console.log(req.user.email)
            console.log(req.user.id)

            const googleRegister = new User({
                username: req.user.name.givenName,
                email: req.user.email,
                googleId: req.user.id,
                is_verified: 1
            })

            let googledoc = await googleRegister.save()
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
        let formData = req.body
        console.log(formData.name)
        console.log(formData.email)
        console.log(formData.mobile)

        let userDocument = await User.updateOne({ _id: userId }, {
            $set: {

                username: formData.name,

                email: formData.email,
                mobile: formData.mobile

            }
        }, { upsert: true })

        console.log(userDocument, "it is updtaed thing")
        res.json({status:true})



    } catch (error) {

        console.log('error rendering userProfile:', error)
        res.status(500).render('error', { error: 'An error occurred while rendering the wishlist.' })
    }

}









module.exports = {
    loadsignup,
    loadLogin,
    loadHome,
    verifiedLogin,
    insertUser,
    verifyMail,
    shopProduct,
    loadRegister,
    resendOtp,
    // beforLogin
    productDetails,
    googleAuth,
    viewWishlist,
    userProfile,
    editProfile


} 