const router = require('express').Router();
const Post=require("../models/Post");
const User=require("../models/User")
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
//moment
const moment=require("moment");
const { findById } = require('../models/Post');

//protect routes middleware
const {ensureGuest, ensureAuthenticated} = require('../libs/auth');



router.get('/',async (req, res) => {
  var posts=await Post.find({})
  res.render('index',{user:req.user,posts:posts});

});


router.get("/post",(req,res)=>{
  res.render("post")
});

router.post("/post",upload.single("pic"),(req,res)=>{
  try {
    //console.log(req.file,req.body);
    var post=new Post()
    post.status=req.body.status
    post.image=req.file.filename
    post.user_id=req.user._id
    post.name=req.user.name
    post.date=moment().format('MMMM Do YYYY, h:mm:ss a')
    post.save((err)=>{
      if(err) throw err;
      res.redirect("/");
    })
  } catch (error) {
    res.send(400);
  }
});

router.get("/profile",ensureAuthenticated,(req,res)=>{
  User.findById(req.user._id,(err,profile)=>{
    if(err) throw err
    Post.find({user_id:profile._id},(err,posts)=>{
      if(err) throw err;
    res.render('profile',{user:req.user,profile:profile,posts:posts})
    })
  });
});

router.get("/profile/:id",async (req,res)=>{
 await User.findById(req.params.id,(err,profile)=>{
    if(err) throw err
    Post.find({user_id:profile._id},(err,posts)=>{
      if(err) throw err;
    res.render('profile',{user:req.user,profile:profile,posts:posts})
    })
  });
});


router.get("/like/:id",ensureAuthenticated,(req,res)=>{
  Post.findByIdAndUpdate(req.params.id,{$push:{likes:req.user._id}},(err)=>{
    if (err) throw err;
    res.redirect("/");
  })
});

router.get("/unlike/:id",ensureAuthenticated,(req,res)=>{
  Post.findByIdAndUpdate(req.params.id,{$pull:{"likes":req.user._id}},(err)=>{
    if(err) throw err;
    res.redirect("/");
  })  
})

module.exports = router;
