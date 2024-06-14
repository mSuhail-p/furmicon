

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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const multer = require('multer');
// const path = require('path');

// // Set up Multer storage configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, path.join(__dirname, '..', 'public', 'userImages'))// Specify the directory to store uploaded files
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// // Create Multer upload instance
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 10 * 1024 * 1024, // Example: 10MB limit for file size
//         fieldSize: 2 * 1024 * 1024, // Example: 2MB limit for field size
//         // fieldNameSize: 100, // Example: limit for field name size (default is 100)
//     },
// })


// module.exports = upload

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



const multer = require('multer');
const path = require('path');

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory to store uploaded files
        cb(null, path.join(__dirname, '..', 'public', 'userImages'));
    },
    filename: function (req, file, cb) {
        // Generate a unique filename using the current timestamp and a random number
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Create Multer upload instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
        fieldSize: 2 * 1024 * 1024, // Limit field size to 2MB
    },
    // Optionally, add a file filter to allow only certain file types
    fileFilter: function (req, file, cb) {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const mimetype = allowedTypes.test(file.mimetype);
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images (jpeg, jpg, png, gif) are allowed!'));
    }
});

module.exports = upload;
