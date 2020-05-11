const { 
        buyOrder, sellOrder,
        findSellPricePoint, 
        findSellLowestPrice,
        findHighestBidderNoLimit,
        findHighestBidder,
        createNewSellOrder,
        createNewBuyOrder,
    } = require('./orderbook');
const tester = require('./test');


// Buy something which mean will look values in Sell Order
// Because we 'buy' from people 'selling' the product

async function limitBuy(price, amount){
    let buyStatement = [];
    let limitBuyOrder = {
        price,
        amount
    }

    console.log("Buy Order : ");
    console.log(limitBuyOrder);
    console.log();

    // Check if it is lowest price
    let priceFlag = findSellLowestPrice(limitBuyOrder.price);
    while(limitBuyOrder.amount > 0 && priceFlag !== null){
        if(priceFlag === null){
            break;
        }
            // Execute Order Here
            let priceNode = sellOrder.find(priceFlag);
            await priceNode.data.forEach((item)=>{
                if(limitBuyOrder.amount <= 0){
                    return;
                }
                if(limitBuyOrder.amount > 0){
                    // Fill whole order and break;
                    if(item.amount >= limitBuyOrder.amount){
                        let itemToPush = {...item};
                        item.amount = item.amount - limitBuyOrder.amount;
                        itemToPush.amount = limitBuyOrder.amount
                        limitBuyOrder.amount = 0;
                        if(item.amount === 0){
                            sellOrder.find(priceFlag).data = sellOrder.find(priceFlag).data.filter(function( obj ) {
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
                        limitBuyOrder.amount -= item.amount;
    
                        sellOrder.find(priceFlag).data = sellOrder.find(priceFlag).data.filter(function( obj ) {
                            return obj.orderId !== item.orderId;
                        });
                    }
                }
            });
    
            console.log()
            console.log("Instant Order Amount Left : "+limitBuyOrder.amount)

        // Delete Tree Node if there is no data anymore
        if(sellOrder.find(priceFlag).data.length <= 0){
            sellOrder.remove(priceFlag)
        }

        priceFlag = findSellLowestPrice(limitBuyOrder.price)
    }

    if(priceFlag === null && limitBuyOrder.amount > 0){
        createNewBuyOrder(limitBuyOrder.price,limitBuyOrder.amount);

    }

    console.log();
    console.log("The Order Statment ")
    console.log(buyStatement);
    tester.lb()
    tester.printNoJoinAllWithID();

}


// Sell something which mean look values in the buy order book
// So we 'sell' product to people who are buying
async function limitSell(price, amount){
    let sellStatement = [];
    let limitSellOrder = {
        price,
        amount
    }

    console.log("Sell Order : ");
    console.log(limitSellOrder);
    console.log();

    // Check if it is lowest price
    let priceFlag = findHighestBidder(limitSellOrder.price);
    console.log(priceFlag);
    while(limitSellOrder.amount > 0 && priceFlag !== null){
        if(priceFlag === null){
            break;
        }
            // Execute Order Here
            let priceNode = buyOrder.find(priceFlag);
            await priceNode.data.forEach((item)=>{
                if(limitSellOrder.amount <= 0){
                    return;
                }
                if(limitSellOrder.amount > 0){
                    // Fill whole order and break;
                    if(item.amount >= limitSellOrder.amount){
                        let itemToPush = {...item};
                        item.amount = item.amount - limitSellOrder.amount;
                        itemToPush.amount = limitSellOrder.amount
                        limitSellOrder.amount = 0;
                        if(item.amount === 0){
                            buyOrder.find(priceFlag).data = buyOrder.find(priceFlag).data.filter(function( obj ) {
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
                        limitSellOrder.amount -= item.amount;
    
                        buyOrder.find(priceFlag).data = buyOrder.find(priceFlag).data.filter(function( obj ) {
                            return obj.orderId !== item.orderId;
                        });
                    }
                }
            });
    
            console.log()
            console.log("Instant Order Amount Left : "+limitSellOrder.amount)

        // Delete Tree Node if there is no data anymore
        if(buyOrder.find(priceFlag).data.length <= 0){
            buyOrder.remove(priceFlag)
        }

        priceFlag = findHighestBidder(limitSellOrder.price)
    }

    if(priceFlag === null && limitSellOrder.amount > 0){
        console.log("Create sell order");
        createNewSellOrder(limitSellOrder.price,limitSellOrder.amount);

    }

    console.log();
    console.log("The Order Statment ")
    console.log(sellStatement);
    tester.lb()
    tester.printNoJoinAllWithID();

}

module.exports = {
    limitSell,
    limitBuy
}