const router = require('express').Router();
const User=require("../models/User")
const Classroom=require('../models/Classroom')
const Poll=require("../models/Poll")
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
router.post('/createClass',ensureAuthenticated,(req,res)=>{
    var classRoom=new Classroom()
    classRoom.name=req.body.name
    classRoom.batch=req.body.batch
    classRoom.semester=req.body.semester
    classRoom.cr=req.user._id
    classRoom.code=uuid.generate();
    classRoom.classmates.push(req.user._id)
    classRoom.classmates_name.push(req.user.name)
    classRoom.link=`/join/${classRoom.code}`
    classRoom.save((err)=>{
        if(err) throw err;
        User.findById(req.user._id,(err,user)=>{
            if(err) throw err;
            user.userClass.push(classRoom._id)
            user.save(err=>{
                if(err) throw err;
                res.redirect('/classroom')
            })  
        })
      
    })
    
});

router.post('/joinClass',ensureAuthenticated,(req,res,next)=>{
  // console.log(req.body);
    
    const code=req.body.code;
    const studentId=req.user._id;
    //console.log(studentId,"student id");
    //.findOneAndUpdate({code:code},{ $push:{ classmates:studentId }} )
    Classroom.findOne({code:code},(err,myclass)=>{
        if(err) throw err;
        
        const allowToClass=(myclass.classmates).indexOf(req.user._id)>-1
        if(allowToClass){
            res.render('classroom',{myclass:myclass})
            console.log(allowToClass,"allow to class");
            console.log(req.user.name);
        }
        else{
            myclass.classmates.push(studentId)
            myclass.classmates_name.push(req.user.name)
            myclass.save(err=>{
                if(err) throw err;
                
                User.findById(studentId,(err,user)=>{
                    if(err) throw err;
                    user.userClass.push(myclass._id)
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

router.get('/:id',ensureAuthenticated,(req,res)=>{
    const id=req.params.id
    Classroom.findById(id,function(err,myclass){
        if(err) throw err;
        Poll.find({},(err,polls)=>{
            if(err) throw err;
            res.render('classroom',{myclass:myclass,user:req.user,polls:polls})
        })
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

router.post('/notes/:id',ensureAuthenticated,upload.single('pic'),(req,res)=>{
    var id=req.params.id
    Classroom.findById(id,(err,classroom)=>{
        if(err) throw err;
        classroom.notes.push(req.file.filename)
        classroom.notes_status.push(req.body.status)
        classroom.save((err)=>{
            if(err) throw err;
            res.redirect(`/classroom/${req.params.id}`)
        })

    })
});

router.post('/announcement/:id',ensureAuthenticated,(req,res)=>{
    var id=req.params.id
    //console.log(req.body.announcement);
    Classroom.findById(id,(err,classroom)=>{
        if(err) throw err;
        classroom.announcement_name.push(req.user.name)
        classroom.announcement.push(req.body.announcement)
        classroom.save((err)=>{
            if(err) throw err;
            res.redirect(`/classroom/${req.params.id}`)
        })

    })
})

router.get('/download/:name',ensureAuthenticated,(req,res)=>{
    var filename=req.params.name
    //Hey this is hard coded Change it :) //D:\Index\inductions\College-Manager
    var filePathUploads=`D:/Index/inductions/College-Manager/uploads/${filename}`    
    res.download(filePathUploads);
})

//create poll
router.post("/poll",ensureAuthenticated,(req,res)=>{
    // console.log(req.body)
    var poll =new Poll();
    poll.hosted=req.user._id
    poll.hostedName=req.user.name
    poll.question=req.body.question
    poll.choice1=req.body.choice1
    poll.choice2=req.body.choice2
    poll.classId=req.body.classId
    poll.save()
        .then(() => {
            res.redirect(`/classroom/${req.body.classId}`)
            
        }).catch((err) => {
            console.log(err);
            
        });
    
})

//poll
router.post("/poll/:choice",(req,res)=>{
    const myChoice=req.params.choice
    // console.log(myChoice);
    // console.log(myChoice==1);
    // console.log(myChoice==2,"2");
    Poll.findById(req.body.id,(err,poll)=>{
        if(myChoice==1){
            poll.dataOne+=1
            
        }
        if(myChoice==2){
            poll.dataTwo+=1;
            // console.log(2);
            // console.log(poll.dataTwo);
        
        }
        poll.polled.push(req.user._id)
        poll.save(err=>{
            if(err) throw err;
            res.send(poll)
        })

    })
    //console.log(req.params.choice,req.body);
})


router.post('/showPollResult',(req,res)=>{
    var id=req.body.id
    // console.log(id);
    Poll.findById(id,(err,poll)=>{
        if(err) throw err;
        // console.log(poll._id);
        res.send(poll)
    })
})
module.exports = router;