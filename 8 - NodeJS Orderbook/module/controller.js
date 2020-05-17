const orderbook = require("./orderbook");
const tester    = require("./test");
const instant   = require("./instantengine");
const lim       = require("./limitengine");
const pr        = require('./processor');
const comodity  = require('./comodity');

lim.limitBuy(150,20);
lim.limitBuy(150,20);
lim.limitBuy(150,20);
lim.limitBuy(150,20);
lim.limitSell(140,30);

tester.printNoJoinAllWithID();
console.log("Comodity Price : "+comodity.getPrice());