const {sellOrder, buyOrder} = require('./orderbook');
const le = require('./limitengine'); 

function processSell(){
    sellOrder.keys().forEach(element => {
        try{
            console.log(element);
            le.limitSell(element.data[element.data.length-1].price,element.data[element.data.length-1].amount);
            sellOrder.find(element).data.forEach((item)=>{
                console.log("Processing : ");
                console.log(item);
                try{
                    le.limitSell(item.price,item.amount);
                }catch(e){
                    console.log("Something went wrong");
                    console.log(item);
                }
            })
        }catch(e){
            console.log("Something went wrong");
            console.log();
            console.log(e);
        }
        
    });
}

function processBuy(){
    
}

function processAll(){

}

module.exports = {
    processSell
}