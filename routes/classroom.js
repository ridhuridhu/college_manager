const router = require('express').Router();
const User=require("../models/User")
const Classroom=require('../models/Classroom')
const {ensureGuest, ensureAuthenticated} = require('../libs/auth');
//lodash
const _=require('lodash')
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
    console.log(studentId,"student id");
    //.findOneAndUpdate({code:code},{ $push:{ classmates:studentId }} )
    Classroom.findOne({code:code},(err,myclass)=>{
        if(err) throw err;
        const allowToClass=(myclass.classmates).indexOf(req.user._id)>-1
        
     
        if(allowToClass){
            res.render('classroom',{myclass:myclass})
            //console.log(allowToClass,"allow to class");
        }
        else{
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
        }
       
    })
})

router.get('/:id',(req,res)=>{
    const id=req.params.id
    Classroom.findById(id,function(err,myclass){
        if(err) throw err;
        res.render('classroom',{myclass:myclass})

    })
    
})

//file upload inside class Room 

//multer middler ware 
const multer=require("multer");
const path = require('path');
const { uniq } = require('lodash');
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

router.post('/notes/:id',upload.single('pic'),(req,res)=>{
    var id=req.params.id
    Classroom.findById(id,(err,classroom)=>{
        if(err) throw err;
        classroom.notes.push(req.file.filename)
        classroom.notes_status.push(req.body.status)
        classroom.save((err)=>{
            if(err) throw err;
            res.send("shared :)")
        })

    })
});

router.post('/announcement/:id',(req,res)=>{
    var id=req.params.id
    console.log(req.body.announcement);
    Classroom.findById(id,(err,classroom)=>{
        if(err) throw err;
        classroom.announcement_name.push(req.user.name)
        classroom.announcement.push(req.body.announcement)
        classroom.save((err)=>{
            if(err) throw err;
            res.send("shared :)")
        })

    })
})

router.get('/download/:name',(req,res)=>{
    var filename=req.params.name
    //Hey this is hard coded Change it :) 
    var filePathUploads=`D:/Index/inductions/Facebook-Clone/uploads/${filename}`    
    res.download(filePathUploads);
})
module.exports = router;