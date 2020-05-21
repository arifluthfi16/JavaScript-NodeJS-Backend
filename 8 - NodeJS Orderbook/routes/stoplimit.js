var express = require('express');
var router = express.Router();
const orderbook = require('../module/orderbook');
const sm = require('../module/stoplimit');

// Get Index
router.get('/',function(req,res,next){
    res.send({
        msg : "Succeed",
        sellOrder   : orderbook.returnSellOrder(),
        buyOrder    : orderbook.returnBuyOrder() 
    }).status(200);
})

router.post('/sell', function(req,res,next){
    const {stopPrice, amount,limitPrice} = req.body;

    sm.stopLimitSell(parseInt(stopPrice),parseInt(amount),parseInt(limitPrice));
    
    res.send({
        status : 200,
        msg : "Succeed create new stop limit sell order",
        orderDetail : {
            stopPrice,
            amount,
            limitPrice
        }
    })
});

router.post('/buy', function(req,res,next){
    const {stopPrice, amount,limitPrice} = req.body;
    
    sm.stopLimitBuy(parseInt(stopPrice),parseInt(amount),parseInt(limitPrice));
    
    
    res.send({
        status : 200,
        msg : "Succeed create new stop limit buy order",
        orderDetail : {
            stopPrice,
            amount,
            limitPrice
        }
    })
});

module.exports = router;