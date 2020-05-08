const {buyOrder, sellOrder,findSellPricePoint,
    findBuyPricePoint} = require('./orderbook');


// Buy something which mean will look values in Sell Order
// Because we 'buy' from people 'selling' the product

function instantBuy(price, amount){
    let buyStatement = [];
    let instantBuyOrder = {
        price,
        amount
    }

    console.log("Buy Order");
    console.log(instantBuyOrder);
    console.log();

    if(findSellPricePoint(instantBuyOrder.price)){
        // Execute Order Here
        let priceNode = sellOrder.find(instantBuyOrder.price);
        priceNode.data.forEach((item)=>{
            if(instantBuyOrder.amount <= 0){
                return;
            }

            // Fill whole order and break;
            if(item.amount >= instantBuyOrder.amount){
                buyStatement.push({
                    item
                });
                item.amount -= instantBuyOrder.amount;
                instantBuyOrder.amount = 0;
                return buyStatement;
            }

            // Fill partial order
            if(item.amount < instantBuyOrder.amount){
                buyStatement.push({
                    item
                });
                instantBuyOrder.amount -= item.amount;

                // Delete the order in the main orderbook
                // console.log("BUY ORDER ARRAY");
                sellOrder.find(price).data.shift()
            }
        })

        console.log("Before Order : ")
        console.log(priceNode.data);
        console.log()
        console.log("The Order Statment ")
        console.log(buyStatement);
        console.log()
        console.log("Instant Order Amount Left : "+instantBuyOrder.amount)
        console.log()
        console.log("After Order : ")
        console.log(sellOrder.find(price).data);


    }else{
        console.log("No Price Point "+price+" In Sell Order Found");
        return null;
    }
}


// Sell something which mean look values in the buy order book
// So we 'sell' product to people who are buying
function instantSell(price, amount){

}

module.exports = {
    instantBuy,
    instantSell
}