var express = require('express');
var router = express.Router();
const orderbook = require('../module/orderbook');
const lim = require('../module/instantengine');

// Get Index
router.get('/',function(req,res,next){
    res.send({
        msg : "Succeed",
        sellOrder   : orderbook.returnSellOrder(),
        buyOrder    : orderbook.returnBuyOrder() 
    }).status(200);
})

router.post('/sell', function(req,res,next){
    const {amount} = req.body;

    lim.instantSell(amount);
    
    res.send({
        status : 200,
        msg : "Succeed create new market sell order",
        orderDetail : {
            amount
        }
    })
});

router.post('/buy', function(req,res,next){
    const {amount} = req.body;

    lim.instantBuy(amount);
    
    res.send({
        status : 200,
        msg : "Succeed create new market buy order",
        orderDetail : {
            amount
        }
    })
});

module.exports = router;