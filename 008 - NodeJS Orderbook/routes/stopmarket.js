var express = require('express');
var router = express.Router();
const orderbook = require('../module/orderbook');
const sm = require('../module/stopmarket');

// Get Index
router.get('/',function(req,res,next){
    res.send({
        msg : "Succeed",
        sellOrder   : orderbook.returnSellOrder(),
        buyOrder    : orderbook.returnBuyOrder() 
    }).status(200);
})

router.post('/sell', function(req,res,next){
    const {price, amount} = req.body;

    sm.stopMarketSell(parseInt(price),parseInt(amount));
    
    res.send({
        status : 200,
        msg : "Succeed create new stop market sell order",
        orderDetail : {
            price,
            amount,
        }
    })
});

router.post('/buy', function(req,res,next){
    const {price,amount} = req.body;
    
    sm.stopMarketBuy(parseInt(price),parseInt(amount));
    
    res.send({
        status : 200,
        msg : "Succeed create new market buy order",
        orderDetail : {
            price,
            amount
        }
    })
});

module.exports = router;