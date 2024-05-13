

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
const fs = require('fs').promises; // Use promises for async/await

const storage = multer.diskStorage({
    destination: async function(req, file, cb) {
        const uploadDir = path.join(__dirname, '../public/userImages');
        try {
            await fs.mkdir(uploadDir, { recursive: true }); // Create directory if it doesn't exist
            cb(null, uploadDir);
        } catch (error) {
            console.log(error);
            cb(error);
        }
    },
    filename: function(req, file, cb) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;


// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

// module.exports= upload

// Use upload.array('newImages', maxCount) for multiple files
// or upload.single('newImage') for a single file
// app.post('/edit-product', upload.array('newImages', 3), edit_product);
