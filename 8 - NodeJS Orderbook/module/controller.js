const orderbook = require("./orderbook");
const tester    = require("./test");
const instant   = require("./instantengine");
const limit     = require("./limitengine");
const pr        = require('./processor');

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

// pr.processSell();
limit.limitSell(115,200);