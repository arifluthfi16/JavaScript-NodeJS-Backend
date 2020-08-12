var express = require('express');
var router = express.Router();
const orderbook = require('../module/orderbook');
const lim = require('../module/limitengine');

// Get Index
router.get('/',function(req,res,next){
    res.send({
        msg : "Succeed",
        sellOrder   : orderbook.returnSellOrder(),
        buyOrder    : orderbook.returnBuyOrder() 
    }).status(200);
})

router.post('/sell', function(req,res,next){
    const {price,amount} = req.body;

    lim.limitSell(price,amount);
    
    res.send({
        status : 200,
        msg : "Succeed create new limit sell order",
        orderDetail : {
            price,
            amount
        }
    })
});

router.post('/buy', function(req,res,next){
    const {price,amount} = req.body;

    lim.limitBuy(price,amount);
    
    res.send({
        status : 200,
        msg : "Succeed create new limit buy order",
        orderDetail : {
            price,
            amount
        }
    })
});

module.exports = router;