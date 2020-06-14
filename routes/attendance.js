const router = require('express').Router();
const User=require("../models/User")
const Attendance=require('../models/Attendance');
const { findByIdAndDelete } = require('../models/User');

//add subject card
router.post('/addSubject',(req,res)=>{
    var subject=new Attendance()
    subject.name=req.body.name;
    subject.user=req.user._id;
    subject.save()
        .then(
            res.send("done")
        )
        .catch((err)=>{
            res.send(err);
        })
});

//delete subject card
router.get('/delete/:id',(req,res)=>{
    Attendance.findByIdAndRemove((req.params.id),(err,done)=>{
        if(err) throw err;
        res.redirect("/profile")
    })

})


//add present to subject card
router.get('/present/:id',(req,res)=>{
    Attendance.findById((req.params.id),(err,subject)=>{
        if(err) throw err;

        subject.present+=1;
        subject.total+=1;
        subject.percentage=(subject.present/subject.total)
        subject.save()
            .then(
                console.log(subject.present,subject.total,subject.percentage),
                res.redirect("/profile")
            )
            .catch((err)=>{
                console.log(err)
            });
      
    }); 
})

//add absent to subject card
router.get('/absent/:id',(req,res)=>{
    Attendance.findById((req.params.id),(err,subject)=>{
        if(err) throw err;

        subject.absent+=1;
        subject.total+=1;
        subject.percentage=(subject.present/subject.total)
        subject.save()
            .then(
                console.log(subject.present,subject.total,subject.percentage),
                res.redirect("/profile")
            )
            .catch((err)=>{
                console.log(err)
            });
      
    }); 
})
module.exports = router;