const Admin = require('../model/Admin')
const User = require('../model/userModel')
const Category = require('../model/category');
//  ddddd= require('../model/product');


const bcrypt = require('bcrypt')








const securepassword = async (password) => {
    try {

        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash

    } catch (error) {
        console.log(error);
    }
}


const loadLogin = async (req, res) => {
    res.render('admin/loginAdmin')
}



const verifyLogin = async (req, res) => {
    try {

        const email = req.body.email;
        const password = await securepassword(req.body.password);

        
        const credential = await Admin.findOne({ email: email });

        
        if (credential) {
            const passwordmatching = await bcrypt.compare(credential.password, password)
            
            if (passwordmatching) {
                req.session.admin = credential._id;


                res.render('admin/dashboad')

            } else {
                res.redirect('/admin');
            }
        } res.redirect('/admin')



    } catch (error) {
        console.log(error)
    }
}

const dashboad = async (req, res) => {
    try {
        res.render('admin/dashboad.ejs');
    } catch (error) {
        console.log(error);
    }
}







const costomer = async (req, res) => {
    try {
        res.render('admin/costomer.ejs');
    } catch (error) {
        console.log(error);
    }
}


const userlist = async (req, res) => {
    try {

        const users = await User.find({ is_verified: 1 });
        res.render('admin/costomer', { users })



    } catch (error) {
        console.log(error)
    }
}




const addCategory = async (req, res) => {
    try {
         

        // const exist = await Category.find({ name: new RegExp(req.body.name, 'i') }).exec();
        const exist = await Category.find({ name: new RegExp(req.body.name.trim(), 'i') }).exec();

        


        if (exist.length == 0 && req.body.name.trim() != "") {


            const categories = new Category({
                name: req.body.name,
                description: req.body.description
            })

            const category = await categories.save();
            


            const message = '/admin/category'
            res.json({ message })

        } else {

            res.json({ message: false })
            // const exist
            // const wrong='An item with the provided details already exists. Please add a new item with unique details'
            // res.render('admin/category',{exist});
            // res.redirect('/admin/category')
            // res.send("wrong")

        }

    } catch (error) {
        console.log(error + "lslfklsdflksd");
    }
}





const loadCategory = async (req, res) => {
    try {

        const allCategory = await Category.find({});
       

        // const checking = Category.find({status:false})

        res.render('admin/category', { allCategory });



    } catch (error) {
        console.log(error)
    }
}



const userBlock = async (req, res) => {
    try {

        const { userId } = req.params;
        

        const isblock = await User.findOne({ _id: userId });
        if (isblock.is_blocked === false) {



            await User.updateOne({ _id: isblock._id }, { $set: { is_blocked: true } })

            res.redirect('/admin/costomer')


            //    res.render('admin/costomer.ejs')
        } else {
            

            await User.updateOne({ _id: isblock._id }, { $set: { is_blocked: false } })
            res.redirect('/admin/costomer')

            
            //   res.render('admin/costomer.ejs')

        }

    } catch (error) {
        console.log(error)
    }
}


const editCategoryLoad = async (req, res) => {
    try {

        const { categoryId } = req.params
        const editCategory = await Category.findOne({ _id: categoryId })
        

        res.render('admin/editCategory', { editCategory })

    } catch (error) {
        console.log(error)
    }
}




const  editingCategory = async (req, res) => {
    try {


        const categoryId = req.params.catergory_id
        const allCategory = await Category.find({});

        // const currentCategory = await Category.findOne({ _id: categoryId });
        const duplecate = allCategory.filter((element) => {

            if (element.name === req.body.name || element.name == req.body.name.trim()) {
                return element.name;
            }


        })

        


        if (duplecate.length === 0 && req.body.name.trim() !== "") {

            await Category.updateMany({ _id: categoryId }, { $set: { name: req.body.name, description: req.body.description } })

            res.json({ message: '/admin/category' })

        } else {
            res.json({ message: 'existing' })

        }


    } catch (error) {
        console.log(error);
    }
}










const deleteCategory = async (req, res) => {
    try {
        const category = req.params.category
      
        const status = await Category.findOne({ _id: category });
        if (status.status) {
            const changing = await Category.findOneAndUpdate({ _id: category }, { $set: { status: false } }, { new: true })
            res.json({ changing })


        } else {

            const changing = await Category.findOneAndUpdate({ _id: category }, { $set: { status: true } }, { new: true })
            res.json({ changing })


        }


    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    verifyLogin,
    loadLogin,
    dashboad,
    costomer,
    userlist,
    userBlock,
    loadCategory,
    addCategory,
    editCategoryLoad,
    deleteCategory,
    editingCategory
}