const router = require('express').Router();
const User=require('../models/User');


router.get('/',async (req, res) => {
    User.find({},(err,users)=>{
        
      res.render("direct",{users:users,user:req.user}); 
    });
  
  });
 

router.get('/:id',(req,res)=>{
  User.findById(req.params.id,(err,otherUser)=>{
    if(err) throw err;
    res.render('direct',{user:req.user,otherUser:otherUser,private:true})
  })
});

module.exports = router;
