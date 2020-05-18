const express = require('express');
const app = express();
const bodyParser     =  require("body-parser");

// Port Setting
const port = 3000;

// Import Router
const limitRouter = require('./routes/limit');
const marketRouter = require('./routes/market');
const comodityRouter = require('./routes/comodity');
const stopMarketRouter = require('./routes/stopmarket');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Imported Router
app.use('/limit',limitRouter);
app.use('/market',marketRouter);
app.use('/comodity', comodityRouter);
app.use('/stopmarket', stopMarketRouter);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))


module.exports = app;