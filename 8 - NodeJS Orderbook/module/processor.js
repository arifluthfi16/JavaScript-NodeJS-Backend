const {sellOrder, buyOrder} = require('./orderbook');
const le = require('./limitengine'); 

function processSell(){
    sellOrder.keys().forEach(element => {
        sellOrder.find(element).data.forEach((item)=>{
            le.limitSell(item.price,item.amount);
        })
    });
}

function processBuy(){
    
}

function processAll(){

}

module.exports = {
    processSell
}