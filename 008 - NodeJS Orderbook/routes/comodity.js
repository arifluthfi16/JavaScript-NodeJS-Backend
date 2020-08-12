var express = require('express');
var router = express.Router();
const comodity = require('../module/comodity');

// Get Index
router.get('/',function(req,res,next){
    res.send({
        msg : "Succeed",
        comodity_price   : comodity.getPrice(),
    }).status(200);
})

module.exports = router;