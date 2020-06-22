const router = require('express').Router();
const User=require('../models/User');
//protect routes middleware
const {ensureGuest, ensureAuthenticated} = require('../libs/auth');


router.get('/',ensureAuthenticated,async (req, res) => {
    User.find({},(err,users)=>{
        
      res.render("direct",{users:users,user:req.user}); 
    });
  
  });
 

router.get('/:id',ensureAuthenticated,(req,res)=>{
  User.findById(req.params.id,(err,otherUser)=>{
    if(err) throw err;
    res.render('direct',{user:req.user,otherUser:otherUser,private:true})
  })
});


router.post("/search",async(req,res)=>{
  //console.log(req.body.name);
  const nameFind=req.body.name;
  var div="<div class='userCard'>" 
  User.find({},(err,users)=>{
    if(err)  throw err;
    users.map(user=>{
      const myName=(user.name).search(nameFind)
      if(myName>=0){
        // console.log(user.name);
        div+=`<a class="userList" href=/direct/${user._id}>
            ${user.name}
            </a>`
            
      }
    })
    div+="</div>";
    res.send(div);
  })
 
})
module.exports = router;
