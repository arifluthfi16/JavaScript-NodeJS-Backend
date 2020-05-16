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

// Find Buy Lowest Price Point

function findHighestBidderNoLimit(){
    let listPrice = buyOrder.keys();

    if(!listPrice[0]){
        return null;
    }

    let temp = listPrice[0];

    for(let i=0;i < listPrice.length;i++){
        if(listPrice[i] > temp){
            temp = listPrice[i];
        }
    }
    return temp;
}

function findHighestBidder(targetPrice){
    let listPrice = buyOrder.keys();
    let len = listPrice.length;
    let temp = targetPrice

    if(temp > listPrice[len-1]){
        return null;
    }

    for(let i=len-1;i >0;i--){
        if(listPrice[i] > temp){
            temp = listPrice[i];
        }
    }
    return temp;
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

// Remove a sell order
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

// Sell order find the closest price point

function findSellLowestPrice(targetPrice){
    let listPrice = sellOrder.keys();

    if(listPrice.length <= 0 ){
        return null;
    }

    let temp = targetPrice

    if(temp < listPrice[0]){
        return null;
    }

    for(let i=0;i < listPrice.length;i++){
        if(listPrice[i] < temp){
            temp = listPrice[i];
        }
    }
    return temp;
}

function findSellLowerPriceNoLimit(){
    let listPrice = sellOrder.keys();

    if(!listPrice[0]){
        return null;
    }

    let temp = listPrice[0];

    for(let i=0;i < listPrice.length;i++){
        if(listPrice[i] < temp){
            temp = listPrice[i];
        }
    }
    return temp;
}

// Find sell price point
function findSellPricePoint(price){
    if(sellOrder.find(price)){
        return true;
    }
    return false;
}

// Return all as json 

function getAllSellOrder(){
    let queue = [];

    console.log(sellOrder);
    return sellOrder;
}

module.exports = {
    createNewBuyOrder,
    removeBuyOrder,
    findSellPricePoint,
    findBuyPricePoint,
    createNewSellOrder,
    removeSellOrder,
    findSellLowestPrice,
    getAllSellOrder,
    findSellLowerPriceNoLimit,
    findHighestBidderNoLimit,
    findHighestBidder,
    buyOrder,
    sellOrder
}
