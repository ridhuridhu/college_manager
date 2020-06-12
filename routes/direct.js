const router = require('express').Router();

router.get('/',async (req, res) => {
    
    res.render("direct")
  });



module.exports = router;
