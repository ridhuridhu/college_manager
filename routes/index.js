const router = require('express').Router();
const Post=require("../models/Post");
//multer middler ware 
const multer=require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload=multer({ storage: storage })


router.get('/', (req, res) => {
  res.render('index',{user:req.user});
});

router.get("/post",(req,res)=>{
  res.render("post")
});

router.post("/post",upload.single("pic"),(req,res)=>{
  console.log(req.body);
  try {
    console.log(req.file,req.body);
    var post=new Post()
    post.status=req.body.status
    post.image=req.file.filename
    post.user=req.user._id
    post.save((err)=>{
      if(err) throw err;
      res.redirect("/");
    })
  } catch (error) {
    res.send(400);
  }
});
module.exports = router;
