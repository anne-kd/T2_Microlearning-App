const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


// Set Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() +        // Bild kann durch beliebigen Namen abgespeichert werden 
            path.extname(file.originalname));
    }
});


// Upload Variable
const upload = multer({
    storage: storage,
    // limits: { fileSize: 1000000 };        (in Bytes)    Limit festlegen für Bildgröße (optional) --> falls zu groß wird in der If-Bedingung err ausgegeben 
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('myImage');


//Check File Type
function checkFileType(file, cb) {
    //Allow
    const filetypes = /jpeg|jpg|png|gif/;
    //Check ext-name
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //Check mime-Typ
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }

}



// INIT APP
const app = express();

//EJS
app.set('view engine', 'ejs');

//Public FOlder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));


app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('index', {
                msg: err
            });
        } else {
            if (req.file == undefined) {
                res.render('index', {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.render('index', {
                    msg: 'File Uploaded!',
                    file: `uploads/${req.file.filename}`
                });
            }
        }
    })
});

const port = 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
