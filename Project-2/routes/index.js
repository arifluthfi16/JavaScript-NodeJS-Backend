var express = require('express');
var router = express.Router();
const multer = require('multer');
var path = require('path')

// Set Storage Engine for Multer
const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function(req,file,cb){
    cb(null, file.fieldname+'-'+Date.now()+path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits : {
    fileSize : 50000
  },
  fileFilter: function(req,file,cb){
    checkFileType(file,cb);
  }
}).single('targetImage')

// Check File Type
function checkFileType(file,cb){
  // Allowed Extension
  const fileType = /.jpeg|.jpg|.png|.gif/;
  // Get Current File Extension
  const ext = fileType.test(path.extname(file.originalname).toLowerCase());
  // Check Mime Types
  const mime = fileType.test(file.mimetype);

  // console.log("Extension : "+path.extname(file.originalname).toLowerCase());
  // console.log("Ext Reg : "+ext);
  // console.log("Mime Reg : "+mime);

  if(ext && mime){
    return cb(null, true);
  }else{
    return cb('Error : Filetype Error')
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/uploadImage',function(req,res,next){
  upload(req,res,(err)=>{
    if(err){
      res.render('index', {
        msg : err
      })
    }else{
      console.log(req.file);
      if(req.file == undefined){
        res.render('index', {
          msg : 'Error : No File Selected'
        })
      }else{
        res.render('index',{
          msg : 'File Uploaded!',
          file : `images/${req.file.filename}`
        });
      }
    }
  })
})

module.exports = router;