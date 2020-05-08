const orderbook = require("./orderbook");
const tester    = require("./test");
const instant   = require("./instantengine");

tester.lb();
tester.generateBothRandomize(20);
// orderbook.createNewSellOrder(200,5,123);
tester.printNoJoinAllWithID();
instant.instantBuy(109,100);
tester.lb()
tester.printNoJoinAllWithID();
