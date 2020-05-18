// const inst      = require('./instantengine');
const orderbook = require('./orderbook');
const {sellOrder,buyOrder} = orderbook;
const comodity = require('./comodity');
console.log("Comodities : ");
console.log(comodity);

function scanStopOrder(comodityPrice){
    // Scan for market instant buy
    console.log("Scanning Orders");
    console.log(orderbook.stopMarketOrderQueue);

    if(orderbook.stopMarketOrderQueue.buy.length > 0){

        // Filter Array
        orderbook.stopMarketOrderQueue.buy = orderbook.stopMarketOrderQueue.buy.filter(function(item){
            // console.log("FILTERING")
            if(comodityPrice <= item.price){
                console.log("Executed Buy Stop Order")
                instantBuy(item.amount);
            }else{
                return item > comodityPrice;
            }
        })
    }
    // Scan for market instant sell
    if(orderbook.stopMarketOrderQueue.sell.length > 0){
        // Filter Array
        console.log("FILTERING SELL ORDER")
        orderbook.stopMarketOrderQueue.sell = orderbook.stopMarketOrderQueue.buy.filter(function(item){
            console.log("FILTERING SELL ORDER")
            if(comodityPrice >= item.price){
                console.log("Executed Sell Stop Order")
                instantSell(item.amount);
            }else{
                return item > comodityPrice;
            }
        })
    }
    //reset
}

async function instantBuy(amount){
    comodity.addValue(amount);

    let buyStatement = [];
    let instantBuyOrder = {
        amount
    }

    console.log("Buy Order : ");
    console.log(instantBuyOrder);
    console.log();

    // Check if it is lowest price
    let priceFlag = orderbook.findSellLowerPriceNoLimit();
    console.log("Price Flag : "+priceFlag);
    while(instantBuyOrder.amount > 0 && priceFlag !== null){
        if(priceFlag === null){
            break;
        }
            // Execute Order Here
            let priceNode = sellOrder.find(priceFlag);
            await priceNode.data.forEach((item)=>{
                if(instantBuyOrder.amount <= 0){
                    return;
                }

                if(instantBuyOrder.amount > 0){
                    // Fill whole order and break;
                    if(item.amount >= instantBuyOrder.amount){
                        let itemToPush = {...item};
                        item.amount = item.amount - instantBuyOrder.amount;
                        itemToPush.amount = instantBuyOrder.amount
                        instantBuyOrder.amount = 0;
                        if(item.amount === 0){
                            orderbook.sellOrder.find(priceFlag).data = sellOrder.find(priceFlag).data.filter(function( obj ) {
                                return obj.orderId !== item.orderId;
                            });
                        }
                        buyStatement.push({
                            item : {...itemToPush}
                        });
                    }else{
                        buyStatement.push({
                            item
                        });
                        instantBuyOrder.amount -= item.amount;
    
                        orderbook.sellOrder.find(priceFlag).data = sellOrder.find(priceFlag).data.filter(function( obj ) {
                            return obj.orderId !== item.orderId;
                        });
                    }
                }
            });
    
            console.log()
            console.log("Instant Order Amount Left : "+instantBuyOrder.amount)

        // Delete Tree Node if there is no data anymore
        try{
            if(sellOrder.find(priceFlag)){
                if(sellOrder.find(priceFlag).data.length <= 0){
                    console.log("PRICE FLAG DELETED : "+priceFlag);
                    sellOrder.remove(priceFlag)
                }
            }
        }catch(e){
            console.log("failed to delete : "+priceFlag)
            console.log()
        }

        priceFlag = orderbook.findSellLowerPriceNoLimit()
    }

    console.log();
    console.log("The Order Statment ")
    console.log(buyStatement);

    }

async function instantSell(amount){
    
    let sellStatement = [];
    let instantSellOrder = {
        amount
    }

    console.log("Sell Order : ");
    console.log(instantSellOrder);
    console.log();

    // Check if it is lowest price
    let priceFlag = orderbook.findHighestBidderNoLimit();
    while(instantSellOrder.amount > 0 && priceFlag !== null){
        if(priceFlag === null){
            break;
        }
            // Execute Order Here
            let priceNode = buyOrder.find(priceFlag);
            await priceNode.data.forEach((item)=>{
                if(instantSellOrder.amount <= 0){
                    return;
                }

                if(instantSellOrder.amount > 0){
                    // Fill whole order and break;
                    if(parseInt(item.amount) >= parseInt(instantSellOrder.amount)){
                        let itemToPush = {...item};
                        item.amount = item.amount - instantSellOrder.amount;
                        itemToPush.amount = instantSellOrder.amount
                        instantSellOrder.amount = 0;
                        if(item.amount === 0){
                            orderbook.buyOrder.find(priceFlag).data = buyOrder.find(priceFlag).data.filter(function( obj ) {
                                return obj.orderId !== item.orderId;
                            });
                        }
                        sellStatement.push({
                            item : {...itemToPush}
                        });
                    }else{
                        sellStatement.push({
                            item
                        });
                        instantSellOrder.amount -= item.amount;
    
                        orderbook.buyOrder.find(priceFlag).data = buyOrder.find(priceFlag).data.filter(function( obj ) {
                            return obj.orderId !== item.orderId;
                        });
                    }
                }
            });
    
            console.log()
            console.log("Instant Order Amount Left : "+instantSellOrder.amount)

        // Delete Tree Node if there is no data anymore
        try{
            if(buyOrder.find(priceFlag)){
                if(buyOrder.find(priceFlag).data.length <= 0){
                    console.log("PRICE FLAG DELETED : "+priceFlag);
                    buyOrder.remove(priceFlag)
                }
            }
        }catch(e){
            console.log("failed to delete : "+priceFlag)
            console.log()
        }

        

        priceFlag = orderbook.findHighestBidderNoLimit()
    }

    console.log();
    console.log("The Order Statment ")
    console.log(sellStatement);

    comodity.decValue(amount);

    }

module.exports = {
    scanStopOrder
}