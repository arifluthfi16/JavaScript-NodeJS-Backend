const express = require('express')
const app = express()
const port = 3000;
var bodyParser     =  require("body-parser");
const orderbook = require('./module/orderbook');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Gracias"));

app.post('/sellorder', (req, res) => {
    let order = req.body;

    orderbook.createNewSellOrder(order.price,order.amount,123);
    res.send({
        msg : "Succeed creating new sell order",
        order : {
            price: order.price,
            amount : order.amount
        }
    });
});

app.get('/sellorder', (req,res)=>{
    res.send({
        msg : "Succeed retrieve all sell order",
        status : 200,
        order : orderbook.getAllSellOrder()
        
    });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))