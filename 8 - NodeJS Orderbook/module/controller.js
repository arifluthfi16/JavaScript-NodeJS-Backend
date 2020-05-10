const orderbook = require("./orderbook");
const tester    = require("./test");
const instant   = require("./instantengine");

tester.lb();
tester.generateBothRandomize(5);
tester.generateBuyRandomize(6);
orderbook.createNewSellOrder(95,10,123);
orderbook.createNewSellOrder(90,5,123);
orderbook.createNewSellOrder(91,5,123);
orderbook.createNewSellOrder(92,5,123);
orderbook.createNewSellOrder(90,5,123);
orderbook.createNewSellOrder(93,79,123);
tester.printNoJoinAllWithID();
instant.instantBuy(109,100);

// console.log(orderbook.sellOrder.find(109).data.shift());
// console.log(orderbook.sellOrder.find(109).data);
// console.log(orderbook.sellOrder.find(109).data.shift());

// Test Order Key


// orderbook.createNewSellOrder(109,10,123);
// orderbook.createNewSellOrder(104,10,123);
// orderbook.createNewSellOrder(116,10,123);
// orderbook.createNewSellOrder(103,10,123);
// console.log(orderbook.findLowestPrice(109))