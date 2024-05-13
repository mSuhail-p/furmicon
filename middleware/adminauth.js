

const is_login = async (req, res, next) => {
    try {

        if (req.session.admin) {
            // res.redirect('/admin/dashboad')
            next()

        } else {
            // res.redirect("/admin");
            next()
            
        }



    } catch (error) {
        console.log(error);
    }
}

module.exports ={
    is_login

}