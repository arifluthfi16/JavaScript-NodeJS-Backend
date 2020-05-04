var AVLTree = require('avl');

var buyOrder = new AVLTree();
var sellOrder = new AVLTree(); 

//// BUY ORDER COMMANDS //

function createNewBuyOrder(price, amount, userID){
    // Constrcut new orderbook
    let limitOrder = {
        price,
        amount,
        orderTime : Date.now(),
        userID,
        side : 'bid',
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



//// TESTING ////

function testDuplicateOrder(){
    // Testing with duplicate price
    for(i=1; i<=5; i++){
        createNewBuyOrder(i,  Math.floor(Math.random() * 100),123);
        createNewBuyOrder(i,  Math.floor(Math.random() * 100),123);
    }
    
    printAllBuyOrder();
}

function generateBothRandomize(n){
    for(i=1; i<=n; i++){
        createNewBuyOrder(i,  Math.floor(Math.random() * 100),123);
        createNewSellOrder(i,  Math.floor(Math.random() * 100),123);
    }
}

function printAllBuyOrder(){
    console.log("\tOrder Price"+"\tAmount")
    buyOrder.forEach(function(node){
        node.data.forEach(function(data){
            console.log("\t"+data.price+"\t\t"+data.amount);
        })
    })
}

function printAllSellOrder(){
    console.log("\tOrder Price"+"\tAmount")
    sellOrder.forEach(function(node){
        node.data.forEach(function(data){
            console.log("\t"+data.price+"\t\t"+data.amount);
        })
    })
}

function printAllBook(){
    console.log("\tBUY ORDER \t\tSELL ORDER")
    console.log("\tPrice"+"\tAmount\t\tPrice"+"\tAmount")
    let buyStr = [];
    let sellStr = [];
    let comb = [];

    buyOrder.forEach(function(node){
        node.data.forEach(function(data){
            buyStr.push("\t"+data.price+"\t"+data.amount)
        })
    })

    sellOrder.forEach(function(node){
        node.data.forEach(function(data){
            sellStr.push("\t\t"+data.price+"\t"+data.amount);
        })
    })

    if(buyStr.length >= sellStr.length){
        // Use buy str as the base
        for(let i=0; i<buyStr.length;i++){
            if(sellStr[i]){
                comb.push(buyStr[i]+sellStr[i])
            }else{
                comb.push(buyStr[i])
            }
        }
    }else{
        // Use sell str as the base
        for(let i=0; i<sellStr.length;i++){
            if(buyStr[i]){
                comb.push(buyStr[i]+sellStr[i])
            }else{
                comb.push("\t\t"+sellStr[i])
            }
        }
    }

    comb.forEach((item)=>{
        console.log(item);
    })
}

function testRemoval(){
    createNewBuyOrder(100,  10,123);
    createNewBuyOrder(100,  20,123);
    createNewBuyOrder(200,  30,123);

    removeBuyOrder(100);

    printAllBuyOrder();
}

function lb(){
    console.log();
}

generateBothRandomize(5);
lb();
printAllBook();