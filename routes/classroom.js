const router = require('express').Router();
const User=require("../models/User")
const Classroom=require('../models/Classroom')
const {ensureGuest, ensureAuthenticated} = require('../libs/auth');

//code generator
const uuid=require('shortid');
const { json } = require('body-parser');
uuid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

router.get('/',(req,res)=>{
   Classroom.find({},(err,classrooms)=>{
    res.render('classHome',{classrooms:classrooms,user:req.user});

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
    classRoom.classmates=req.user._id
    classRoom.link=`/join/${classRoom.code}`
    classRoom.save((err)=>{
        if(err) throw err;
        res.redirect('/classroom')
    })
    
});

router.post('/joinClass',(req,res)=>{
   console.log(req.body);
 
    const code=req.body.code;
    const studentId=req.user._id;
    console.log(studentId);
    //.findOneAndUpdate({code:code},{ $push:{ classmates:studentId }} )
    Classroom.findOne({code:code},(err,myclass)=>{
        if(err) throw err;
        myclass.classmates.push(studentId)
        myclass.save(err=>{
            if(err) throw err;
            
            User.findById(studentId,(err,user)=>{
                if(err) throw err;
                user.class.push(myclass._id)
                //console.log(user.name);
                user.save(err=>{
                    if (err) throw err;
                    res.render('classroom',{myclass:myclass})
                })
            })
        })
    })
  
  
})

router.get('/:id',(req,res)=>{
    const id=req.params.id
    Classroom.findById(id,function(err,myclass){
        if(err) throw err;
        res.render('classroom',{myclass:myclass})

    })
    
})
module.exports = router;