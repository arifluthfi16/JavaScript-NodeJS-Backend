var W3CWebSocket = require('websocket').w3cwebsocket;
var client = new W3CWebSocket('wss://wsapi.coinut.com');

client.onmessage = function(e) {
    console.log(e.data);
};

client.onopen = function () {
    // console.trace();
    client.send(`{"request":"inst_order_book","inst_id":1, "subscribe": true, "nonce":704114}`)
}