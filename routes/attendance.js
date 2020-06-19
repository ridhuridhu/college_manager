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
            res.redirect("/profile")
        )
        .catch((err)=>{
            res.send(err);
        })
});

//ajax del Button
router.post('/delBox',(req,res)=>{
    var id=(req.body.id);
    Attendance.findByIdAndRemove((id),(err,done)=>{
        if(err) throw err;
        res.send(id)
    })
    

   
})

router.post('/present',(req,res)=>{
    Attendance.findById((req.body.id),(err,subject)=>{
        if(err) throw err;
        const NewSubject={}
        subject.present+=1;
        subject.total+=1;
        subject.percentage=(subject.present/subject.total)
        if(subject.percentage>=0.75){ NewSubject.status= `<h2 class="alert alert-success">Status:Peace Podu ✌🏻</h2>  `
        }
        if(subject.percentage<0.75){NewSubject.status=`<h2 class="alert alert-danger">Status: No Peace 🏃🏻‍♂️</h2>`
        }
      
        NewSubject.present=subject.present
        NewSubject.absent=subject.absent
        NewSubject.total=subject.total
        NewSubject.percentage=subject.percentage
        NewSubject.name=subject.name
        NewSubject.id=subject._id
        subject.save()
        
            .then(
                //console.log(NewSubject),
                res.send(NewSubject)
                
            )
            .catch((err)=>{
                console.log(err)
            });
      
    }); 
});

router.post('/absent',(req,res)=>{
    Attendance.findById((req.body.id),(err,subject)=>{
        if(err) throw err;
        const NewSubject={}
        subject.absent+=1;
        subject.total+=1;
        subject.percentage=(subject.present/subject.total)
        if(subject.percentage>=0.75){ NewSubject.status= `<h2 class="alert alert-success">Status:Peace Podu ✌🏻</h2>  `
        }
        if(subject.percentage<0.75){NewSubject.status=`<h2 class="alert alert-danger">Status: No Peace 🏃🏻‍♂️</h2>`
        }
        NewSubject.present=subject.present
        NewSubject.absent=subject.absent
        NewSubject.total=subject.total
        NewSubject.percentage=subject.percentage
        NewSubject.name=subject.name
        NewSubject.id=subject._id
      
        subject.save()
            .then(
                //console.log(subject.present,subject.total,subject.percentage),
                res.send(NewSubject)
            )
            .catch((err)=>{
                console.log(err)
            });
      
    })
})
module.exports = router;