const comodity = require('./comodity');
const { 
    buyOrder, sellOrder,
    findSellPricePoint, 
    findSellLowestPrice,
    findHighestBidderNoLimit,
    findHighestBidder,
    createNewSellOrder,
    createNewBuyOrder,
    stopMarketOrderQueue
} = require('./orderbook');

const instant = require('./instantengine');

function stopMarketBuy(price,amount){
    
    let buyOrder = {
        price,
        amount
    }

    // If the current price fit the stop order
    // Immediately fill the order
    if(comodity.getPrice() <= price) {
        instant.instantBuy(buyOrder.amount)
    }else{ 
        // Push the order to market queue
        console.log("Pushed buy order queue");
        stopMarketOrderQueue.buy.push((buyOrder));
    }
}

function stopMarketSell(price,amount){
    let sellOrder = {
        price,
        amount
    }

    // If the current price fit the stop order
    // Immediately fill the order
    if(comodity.getPrice() >= price) {
        instant.instantSell(buyOrder.price,buyOrder.amount)
    }else{ 
        // Push the order to market queue
        console.log("Pushed sell order queue");
        stopMarketOrderQueue.sell.push((sellOrder));
    }
}

module.exports = {
    stopMarketBuy,
    stopMarketSell
}