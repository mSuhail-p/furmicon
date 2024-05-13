const express = require('express');
const router = express.Router();
const path = require('path');


const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const adminAuth =require('../middleware/adminauth')
const upload = require('../middleware/uploadImage')



router.use(express.static(path.join(__dirname, 'public')));
 

//  router.get('/',(req,res)=>{
//   res.render('admin/dashboad')
//  })

//  router.get('/costomer',(req,res)=>{
//   res.render('admin/costomer')
//  })




 //LOGIN
 router.get('/',adminController.loadLogin);
 router.post('/login',adminController.verifyLogin);

//DASHBOARD
 router.get('/dashboad',adminAuth.is_login,adminController.dashboad)


 


//ADD PRODUCT 
router.get('/add_product',adminAuth.is_login,productController.loadAddProduct)
router.post('/add_product',upload.array('images[]'),productController.addProduct)
// router.post('/add_product',productController.addProduct)
// LOAD PRODUCT 
router.get('/product',adminAuth.is_login,productController.loadproduct);
//BLOCK product
router.get('/blockProduct/:product_id',productController.blockProduct);
//Edit prodcut
router.get('/edit_product/:editProduct',productController.editProductLoad)
router.post('/edit_product/:productId',upload.array('images[]'),productController.edit_product)
// .post('/edit-product', upload.array('newImages', 3),productController.edit_product);



 

//CATEGARY

router.get('/category',adminAuth.is_login,adminController.loadCategory)
 
//USERLIST
router.get('/costomer',adminAuth.is_login,adminController.userlist)

//USER BLOCK

router.get('/userblock/:userId',adminController.userBlock);

//addCategory 
router.post('/addCategory',adminController.addCategory)

//editCategory 
 router.get('/editCategory/:categoryId',adminController.editCategoryLoad);
 router.put('/editingCategory/:catergory_id',adminController.editingCategory)

 //delete category 
 router.get('/deleteCategory/:category',adminController.deleteCategory)
 








module.exports = router;
