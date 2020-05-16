const orderbook = require("./orderbook");
const tester    = require("./test");
const instant   = require("./instantengine");
const limit     = require("./limitengine");
const pr        = require('./processor');

tester.lb();
tester.generateLimitBuy(5);
// orderbook.createNewSellOrder(95,10,123);
// orderbook.createNewSellOrder(90,5,123);
// orderbook.createNewSellOrder(91,5,123);
// orderbook.createNewSellOrder(92,5,123);
// orderbook.createNewSellOrder(90,5,123);
// orderbook.createNewSellOrder(93,79,123);
tester.printNoJoinAllWithID();

// limit.limitSell(115,200);