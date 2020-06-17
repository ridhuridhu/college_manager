const router = require('express').Router();
const User=require("../models/User")
const Classroom=require('../models/Classroom')
const {ensureGuest, ensureAuthenticated} = require('../libs/auth');

//code generator
const uuid=require('shortid');
uuid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

router.get('/',(req,res)=>{
   Classroom.find({},(err,classrooms)=>{
    res.render('classHome',{classrooms:classrooms});

   });

    })
//{ name: 's', batch: 's', semester: 's' }
router.post('/createClass',(req,res)=>{
    var classRoom=new Classroom()
    classRoom.name=req.body.name
    classRoom.batch=req.body.batch
    classRoom.semester=req.body.semester
    classRoom.cr=req.user._id
    classRoom.code=uuid.generate();
    classRoom.save((err)=>{
        if(err) throw err;
        res.redirect('/classroom')
    })
    

    

});

router.post('/joinClass',(req,res)=>{
    console.log(req.body);
    res.redirect('/classroom')
})
module.exports = router;