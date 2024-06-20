const express = require('express');
const router = express.Router();
const path = require('path');


const adminController = require('../controllers/adminController')
const productController = require('../controllers/productController')
const orderController = require('../controllers/orderController')
const offerContoller = require('../controllers/offerController')
const coupenController = require('../controllers/coupenController')
const adminAuth = require('../middleware/adminauth')
const upload = require('../middleware/uploadImage')



router.use(express.static(path.join(__dirname, 'public')));


//  router.get('/',(req,res)=>{
//   res.render('admin/dashboad')
//  })

//  router.get('/costomer',(req,res)=>{
//   res.render('admin/costomer')
//  })




//LOGIN
router.get('/', adminController.loadLogin);
router.post('/login', adminController.verifyLogin);

//DASHBOARD
router.get('/dashboad', adminAuth.is_login, adminController.dashboad)


// PRODUCT 
router.get('/add_product', adminAuth.is_login, productController.loadAddProduct)
// router.post('/add_product',upload.array('images[]'),productController.addProduct)
router.post('/add_product', upload.array('croppedImages[]', 4), productController.addProduct);
router.get('/product', adminAuth.is_login, productController.loadproduct);
router.get('/blockProduct/:product_id', productController.blockProduct);
router.get('/edit_product/:editProduct', adminAuth.is_login, productController.editProductLoad)
const imgUploads = upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }, { name: 'image4' }]);
router.post('/edit_product/:productId', imgUploads, productController.edit_product);
router.patch('/saveOffer/:offerId/:productId', productController.saveOffer)
router.patch('/removeOffer',productController.removeOffer)


//ORDERS
router.get('/orders', adminAuth.is_login, orderController.getOrder)
router.get('/changeStatus/:productId/:status/:exactProductId', adminAuth.is_login, orderController.changeOrderStatus)



//USERLIST
router.get('/costomer', adminAuth.is_login, adminController.userlist)
router.get('/userblock/:userId', adminController.userBlock);


//CATEGARY
router.get('/category', adminAuth.is_login, adminController.loadCategory)
router.post('/addCategory', adminController.addCategory)
router.get('/editCategory/:categoryId', adminController.editCategoryLoad);
router.put('/editingCategory/:catergory_id', adminController.editingCategory)
router.get('/deleteCategory/:category', adminController.deleteCategory)
router.patch('/saveCategoryOffer/:catOfferId/:categoryId', adminController.saveCategoryOffer)



//OFFER
router.get('/offer', adminAuth.is_login,adminAuth.is_login,offerContoller.getOffer)
router.post('/addOffer',adminAuth.is_login, adminAuth.is_login,offerContoller.addOffer)
router.delete('/deleteOffer/:offerId',adminAuth.is_login,adminAuth.is_login, offerContoller.deleteOffer)
router.get('/editOffer',offerContoller.editOffer)
router.patch('/editOffer',offerContoller.editingOffer)

//coupen
router.get('/getCoupen',adminAuth.is_login,coupenController.getCoupen)
router.post('/addCoupen',adminAuth.is_login,coupenController.addCoupen)
router.delete('/deleteCoupen/:coupenId',adminAuth.is_login,coupenController.deleteCoupen)

//sales report
router.get('/getSalesReport',adminAuth.is_login,orderController.getSalesReport)
router.post('/searchWithDate',orderController.searchWithDate)
router.get('/sortReport',orderController.sortReport)





//signout
router.get('/logout', adminController.logout)








module.exports = router;
