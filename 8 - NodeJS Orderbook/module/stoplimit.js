const comodity = require('./comodity');
const { 
    buyOrder, sellOrder,
    findSellPricePoint, 
    findSellLowestPrice,
    findHighestBidderNoLimit,
    findHighestBidder,
    createNewSellOrder,
    createNewBuyOrder,
    stopLimitOrderQueue
} = require('./orderbook');

const lim = require('./limitengine');

function stopLimitBuy(stopPrice,amount,limitPrice){
    
    let buyOrder = {
        stopPrice,
        amount,
        limitPrice
    }

    // If the current price fit the stop order
    // Immediately fill the order
    if(comodity.getPrice() <= stopPrice) {
        lim.limitBuy(limitPrice,amount)
    }else{ 
        // Push the order to market queue
        console.log("Pushed limit buy order queue");
        stopLimitOrderQueue.buy.push((buyOrder));
    }
}

function stopLimitSell(stopPrice,amount,limitPrice){
    let sellOrder = {
        stopPrice,
        amount,
        limitPrice
    }

    // If the current price fit the stop order
    // Immediately fill the order
    if(comodity.getPrice() >= stopPrice) {
        lim.limitSell(limitPrice,amount)
    }else{ 
        // Push the order to market queue
        console.log("Pushed limit sell order queue");
        stopLimitOrderQueue.sell.push((sellOrder));
    }
}

module.exports = {
    stopLimitBuy,
    stopLimitSell
}