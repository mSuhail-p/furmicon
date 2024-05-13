const User = require('../model/userModel')



const is_login = async (req, res, next) => {
    try {
        if (req.session.user_id) {
            next()
        } else {
            const message = "logout"
            res.render('user/home', { message })

        }


    } catch (error) {
        console.log(error)
    }
}


const is_logout = async (req, res, next) => {
    try {

        if (req.session.a) {
            res.redirect('/admin')
        } else if (req.session.user_id) {

            next();

        } else {
            res.redirect("/");
        }
 
    } catch (error) {
        console.log(error);
    }
}

const cart = async (req, res, next) => {
    try {


        if (req.session.a) {
            res.redirect('/admin')
        } else if (req.session.user_id) {
            next();
        } else {
            res.redirect("/login");
        }



    } catch (error) {
        console.log(error);
    }
}





//authenticated user
const isAuthenticated = async (req, res, next) => {
    try {
        if (req.session.user_id) {


            res.locals.userAuthenticated = true;
            return next()
        } else {

            res.locals.userAuthenticated = false;
            return next()
        }
    } catch (error) {
        console.log(error.message)
    }
}




// const is_blocked = async (req, res, next) => {
//     try {


//         const userBlocked = await User.find({ _id: req.session.user_id });
//         console.log("user : ", userBlocked);
//         if (req.session.user_id && userBlocked[0].is_blocked===false) {
//             next();
//         } else {
//             console.log("rdirect to login" + userBlocked);
//             req.session.user_id = null
// res.redirect('/login')
//    let blockingMessage='you were blocked by Admin'
// res.json({message:'You were blocked b'})
// res.render('user/home')
//             next()
//         }

//     } catch (error) {

//         console.log(error);
//     }
// }



const is_blocked = async (req, res, next) => {
    try {


        const userBlocked = await User.find({
            $or: [
                { _id: req.session.user_id },
                { googleId: req.session.user_id }
            ]
        });


        if (req.session.user_id && userBlocked[0].is_blocked === false) {
            next(); // Continue to the next middleware or route handler
        } else if (req.session.user_id && userBlocked[0].is_blocked === true) {
            console.log("Redirect to login: ",);
            req.session.user_id = null;
            // res.redirect('/user/blocked')
            res.render('user/home', { message: 'You were blocked by Admin' })

        } else {
            next()
        }

    } catch (error) {
        console.error('Error in is_blocked middleware:', error);
        res.status(500).json({ message: 'Internal server error' }); // Send error response
    }
};




module.exports = {
    is_login,
    is_logout,
    isAuthenticated,
    // isAuthenticated,
    is_blocked,
    cart

}