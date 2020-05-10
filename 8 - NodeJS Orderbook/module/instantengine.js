const {buyOrder, sellOrder,findSellPricePoint, findSellLowestPrice,
    findBuyPricePoint} = require('./orderbook');
const tester = require('./test');


// Buy something which mean will look values in Sell Order
// Because we 'buy' from people 'selling' the product

async function instantBuy(price, amount){
    let buyStatement = [];
    let instantBuyOrder = {
        price,
        amount
    }

    console.log("Buy Order : ");
    console.log(instantBuyOrder);
    console.log();

    // Check if it is lowest price
    let priceFlag = findSellLowestPrice(instantBuyOrder.price);
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
            })
    
            console.log()
            console.log("Instant Order Amount Left : "+instantBuyOrder.amount)

        // Delete Tree Node if there is no data anymore
        if(sellOrder.find(priceFlag).data.length <= 0){
            sellOrder.remove(priceFlag)
        }

        priceFlag = findSellLowestPrice(instantBuyOrder.price)
    }

    console.log();
    console.log("The Order Statment ")
    console.log(buyStatement);
    tester.lb()
    tester.printNoJoinAllWithID();

    }


// Sell something which mean look values in the buy order book
// So we 'sell' product to people who are buying
function instantSell(price, amount){

}

module.exports = {
    instantBuy,
    instantSell
}