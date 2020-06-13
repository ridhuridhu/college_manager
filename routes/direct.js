const router = require('express').Router();
const User=require('../models/User');
router.get('/',async (req, res) => {
    User.find({},(err,users)=>{
        
      res.render("direct",{users:users}); 
    });
  
  });



module.exports = router;
