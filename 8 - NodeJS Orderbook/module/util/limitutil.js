const { 
    buyOrder, sellOrder,
    findSellPricePoint, 
    findSellLowestPrice,
    findHighestBidderNoLimit,
    findHighestBidder,
    createNewSellOrder,
    createNewBuyOrder,
} = require('../orderbook');

const comodity = require('../comodity');

// Buy something which mean will look values in Sell Order
// Because we 'buy' from people 'selling' the product

async function limitBuy(price, amount){

let buyStatement = [];
let limitBuyOrder = {
    price,
    amount
}

// console.log("Buy Order : ");
// console.log(limitBuyOrder);
// console.log();

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
                if(parseInt(item.amount) >= parseInt(limitBuyOrder.amount)){
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

        // console.log()
        // console.log("Instant Order Amount Left : "+limitBuyOrder.amount)

    // Delete Tree Node if there is no data anymore
    try{
        if(sellOrder.find(priceFlag)){
            if(sellOrder.find(priceFlag).data.length <= 0){
                // console.log("PRICE FLAG DELETED : "+priceFlag);
                sellOrder.remove(priceFlag)
            }
        }
    }catch(e){
        console.log("failed to delete : "+priceFlag)
        console.log()
    }

    priceFlag = findSellLowestPrice(limitBuyOrder.price)
}

if(priceFlag === null && limitBuyOrder.amount > 0){
    createNewBuyOrder(limitBuyOrder.price,limitBuyOrder.amount);

}

if(buyStatement.length > 0){
    // Create partial order stetment
    console.log("The Order Statment")
    console.log(buyStatement);
    console.log();
}else{
    // console.log("Order failed to fill, new buy order created");
    // console.log();
}

comodity.addValue(amount);

}


// Sell something which mean look values in the buy order book
// So we 'sell' product to people who are buying
async function limitSell(price, amount){

let sellStatement = [];
let limitSellOrder = {
    price,
    amount
}

// console.log("Sell Order : ");
// console.log(limitSellOrder);
// console.log();

// Check if it is lowest price
let priceFlag = findHighestBidder(limitSellOrder.price);
while(limitSellOrder.amount > 0 && priceFlag !== null){
    if(priceFlag === null){
        break;
    }
        // Execute Order Here
        let priceNode = buyOrder.find(priceFlag);
        priceNode.data.forEach((item)=>{
            if(limitSellOrder.amount <= 0){
                return;
            }
            if(limitSellOrder.amount > 0){
                // Fill whole order and break;
                if(parseInt(item.amount) >= parseInt(limitSellOrder.amount)){
                    console.log("Fill whole order");
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
                    console.log("Fill Partial Order");
                    console.log(item.amount +" >= "+ limitSellOrder.amount);
                    console.log(item.amount >= limitSellOrder.amount)
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
    try{
        if(buyOrder.find(priceFlag)){
            if(buyOrder.find(priceFlag).data.length <= 0){
                // console.log("PRICE FLAG DELETED : "+priceFlag);
                buyOrder.remove(priceFlag)
            }
        }
    }catch(e){
        // console.log("failed to delete : "+priceFlag)
        // console.log()
    }

    priceFlag = findHighestBidder(limitSellOrder.price)
}

if(priceFlag === null && limitSellOrder.amount > 0){
    // console.log("Create sell order");
    createNewSellOrder(limitSellOrder.price,limitSellOrder.amount);

}

if(sellStatement.length > 0){
    // Create partial order stetment
    console.log("The Order Statment")
    console.log(sellStatement);
    console.log();
}else{
    // console.log("Order failed to fill, new sell order created");
    // console.log();
}

comodity.decValue(amount);    
}

module.exports = {
limitSell,
limitBuy
}