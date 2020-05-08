var AVLTree = require('avl');

var buyOrder = new AVLTree();
var sellOrder = new AVLTree(); 

//// BUY ORDER COMMANDS ////

function createNewBuyOrder(price, amount, userID){
    // Constrcut new orderbook
    let limitOrder = {
        price,
        amount,
        orderTime : Date.now(),
        userID,
        side : 'bid',
        orderId : Math.floor(Math.random() * (500-300)+300)
    }

    if(findBuyPricePoint(price)){
    // If the price node exists
        buyOrder.find((price)).data.push(limitOrder);
    }else{
    // If the price node is not exists
        buyOrder.insert(price,[limitOrder]);
    }
}

// Remove a buy order
function removeBuyOrder(price){
    if(findBuyPricePoint(price)){
        // If the node have more than 1 entry
        if(buyOrder.find((price)).data.length > 1){
            buyOrder.find((price)).data.shift();
        }else{  
        // if the price point only have single entry
            buyOrder.remove(price);
        }  
    }else{
        console.log("Buy order with price : "+price+" not found");
    }
}

// Find Buy Order
function findBuyPricePoint(price){
    if(buyOrder.find(price)){
        return true;
    }
    return false;
}

//// SELL ORDER COMMANDS //

function createNewSellOrder(price, amount, userID){
    // Constrcut new orderbook
    let limitOrder = {
        price,
        amount,
        orderTime : Date.now(),
        userID,
        side : 'ask',
        orderId : Math.floor(Math.random() * (500-300)+300)
    }

    if(findSellPricePoint(price)){
    // If the price node exists
        sellOrder.find((price)).data.push(limitOrder);
    }else{
    // If the price node is not exists
    sellOrder.insert(price,[limitOrder]);
    }
}

// Remove a buy order
function removeSellOrder(price){
    if(findSellPricePoint(price)){
        // If the node have more than 1 entry
        if(sellOrder.find((price)).data.length > 1){
            sellOrder.find((price)).data.shift();
        }else{  
        // if the price point only have single entry
            sellOrder.remove(price);
        }  
    }else{
        console.log("Buy order with price : "+price+" not found");
    }
}

// Find Buy Order
function findSellPricePoint(price){
    if(sellOrder.find(price)){
        return true;
    }
    return false;
}

module.exports = {
    createNewBuyOrder,
    removeBuyOrder,
    findSellPricePoint,
    findBuyPricePoint,
    createNewSellOrder,
    removeSellOrder,
    buyOrder,
    sellOrder
}
