const {buyOrder, sellOrder,findSellPricePoint, findSellLowestPrice,
    findSellLowerPriceNoLimit,findHighestBidderNoLimit,
    findBuyPricePoint} = require('./orderbook');
const tester = require('./test');

const comodity = require('./comodity');


// Buy something which mean will look values in Sell Order
// Because we 'buy' from people 'selling' the product

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
    let priceFlag = findSellLowerPriceNoLimit();
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
                        instantBuyOrder.amount -= item.amount;
    
                        sellOrder.find(priceFlag).data = sellOrder.find(priceFlag).data.filter(function( obj ) {
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

        priceFlag = findSellLowerPriceNoLimit()
    }

    console.log();
    console.log("The Order Statment ")
    console.log(buyStatement);
    tester.lb()
    tester.printNoJoinAllWithID();

    }


// Sell something which mean look values in the buy order book
// So we 'sell' product to people who are buying
async function instantSell(amount){
    comodity.decValue(amount);

    let sellStatement = [];
    let instantSellOrder = {
        amount
    }

    console.log("Sell Order : ");
    console.log(instantSellOrder);
    console.log();

    // Check if it is lowest price
    let priceFlag = findHighestBidderNoLimit();
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
                    if(item.amount >= instantSellOrder.amount){
                        let itemToPush = {...item};
                        item.amount = item.amount - instantSellOrder.amount;
                        itemToPush.amount = instantSellOrder.amount
                        instantSellOrder.amount = 0;
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
                        instantSellOrder.amount -= item.amount;
    
                        buyOrder.find(priceFlag).data = buyOrder.find(priceFlag).data.filter(function( obj ) {
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

        

        priceFlag = findHighestBidderNoLimit()
    }

    console.log();
    console.log("The Order Statment ")
    console.log(sellStatement);
    tester.lb()
    tester.printNoJoinAllWithID();

    }

module.exports = {
    instantBuy,
    instantSell
}