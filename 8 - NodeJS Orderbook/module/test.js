const {
    createNewBuyOrder,
    removeBuyOrder,
    findSellPricePoint,
    findBuyPricePoint,
    createNewSellOrder,
    removeSellOrder,
    buyOrder,
    sellOrder
} = require('./orderbook');

const lim = require('./limitengine');

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
        createNewBuyOrder(
                    Math.floor(Math.random() * (120-100)+100),  
                    Math.floor(Math.random() * 100),
                    123
                );

        createNewSellOrder(
                    Math.floor(Math.random() * (120-100)+100),  
                    Math.floor(Math.random() * 100),
                    123
                );
    }
}

function generateBuyRandomize(n){
    for(i=1; i<=n; i++){
        createNewBuyOrder(
                    Math.floor(Math.random() * (120-100)+100),  
                    Math.floor(Math.random() * 100),
                    123
                );
    }
}

async function generateLimitBuy(n){
    var i = 1;
    let interval = setInterval(()=>{
        lim.limitBuy(
            Math.floor(Math.random() * (120-100)+100),  
            Math.floor(Math.random() * 100)
        );
        console.log(i)
        if(i++ >= 5){
            clearInterval(interval);
        }
    }, 200)
}

async function generateLimitSell(n){
    var j = 1;
    let interval = setInterval(()=>{
        lim.limitSell(
            Math.floor(Math.random() * (120-100)+100),  
            Math.floor(Math.random() * 100)
        );
        if(j++ >= n){
            clearInterval(interval);
        }
    }, 200)
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

function printJoinAllBook(){
    console.log("\tBUY ORDER \t\tSELL ORDER")
    console.log("\tPrice"+"\tAmount\t\tPrice"+"\tAmount")
    let buyStr = [];
    let sellStr = [];
    let comb = [];
    let buyJoin = [];
    let sellJoin = [];

    buyOrder.forEach(function(node){
        finalAmount = 0;

        node.data.forEach(function(data){
            finalAmount += data.amount;
        })

        buyStr.push("\t"+node.data[0].price+"\t"+finalAmount);
    })

    buyStr = buyStr.reverse();

    sellOrder.forEach(function(node){
        finalAmount = 0;
        node.data.forEach(function(data){
            finalAmount += data.amount;
        })

        sellStr.push("\t\t"+node.data[0].price+"\t"+finalAmount);
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

function printNoJoinAllBook(){
    console.log("\tBUY ORDER \t\tSELL ORDER")
    console.log("\tPrice"+"\tAmount\t\tPrice"+"\tAmount")
    let buyStr = [];
    let sellStr = [];
    let comb = [];
    let buyJoin = [];
    let sellJoin = [];

    buyOrder.forEach(function(node){
        node.data.forEach(function(data){
            buyStr.push("\t"+data.price+"\t"+data.amount);
        })
    })

    buyStr = buyStr.reverse();

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

function printNoJoinAllWithID(){
    console.log("\tBUY ORDER \t\t\tSELL ORDER")
    console.log("\tPrice"+"\tAmount\tid\t\tPrice"+"\tAmount\tid")
    let buyStr = [];
    let sellStr = [];
    let comb = [];
    let buyJoin = [];
    let sellJoin = [];
    let buyLen = buyOrder.keys().length;
    let sellLen = sellOrder.keys().length;
    

    if(!buyLen <= 0){
        buyOrder.forEach(function(node){
            node.data.forEach(function(data){
                buyStr.push("\t"+data.price+"\t"+data.amount+"\t"+data.orderId);
            })
        })

        buyStr = buyStr.reverse();
    }

    if(!sellLen <= 0){
        sellOrder.forEach(function(node){
            node.data.forEach(function(data){
                sellStr.push("\t\t"+data.price+"\t"+data.amount+"\t"+data.orderId);
            })
        })
    }
    

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
                comb.push("\t\t\t"+sellStr[i])
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

function testLib(){
    console.log("Library tester is connected");
}

const version = 1;

module.exports = {
    testDuplicateOrder,
    testRemoval,
    lb,
    printJoinAllBook,
    printNoJoinAllBook,
    printAllBuyOrder,
    printAllSellOrder,
    generateBothRandomize,
    printNoJoinAllWithID,
    generateBuyRandomize,
    generateLimitBuy,
    generateLimitSell,
    testLib,
    version
}