

// const multer = require('multer')
// const fs = require('fs');
// const path = require('path');







// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         const uploadDir = path.join(__dirname, '../public/userImages');
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir);
//         }
//         cb(null, uploadDir);
//     },
//     filename: function(req, file, cb) {
//         const name = Date.now() + '-' + file.originalname;
//         cb(null, name);
//     }
//   });
//   const upload = multer({ storage: storage })


//   module.exports = upload


const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'userImages'))// Specify the directory to store uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Create Multer upload instance
const upload = multer({ storage: storage })


  module.exports = upload
 
