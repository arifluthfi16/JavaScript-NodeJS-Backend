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
const tester = require('./test');
const instant = require('./instantengine');

function stopMarketBuy(price,amount){
    
    let buyOrder = {
        price,
        amount
    }

    // If the current price fit the stop order
    // Immediately fill the order
    if(comodity.getPrice() <= price) {
        instant.instantBuy(buyOrder.price,buyOrder.amount)
    }else{ 
        // Push the order to market queue
        stopMarketOrderQueue.buy.push((buyOrder));
    }
}

function stopMarketSell(){
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
        stopMarketOrderQueue.sell.push((sellOrder));
    }
}

module.exports = {
    stopMarketBuy,
    stopMarketSell
}