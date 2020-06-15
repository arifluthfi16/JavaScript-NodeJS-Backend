const express = require('express');
const bodyParser = require('body-parser');
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

app.post('/subscribe', (req,res)=>{
    if(
        req.body.captcha === undefined ||
        req.body.captcha === "" ||
        req.body.captcha === null
    ){
        return res.json({"success":false, "msg":"please select captcha"});
    }

    // Secret Key
    const secretKey = "6LfxBqUZAAAAAC1wFDGnJddLbz2R1a4TgjrdNDWu";

    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddress}`;

    // Make Request to verify url
    request(verifyUrl, (err,response, body)=>{
        body = JSON.parse(body);
        console.log("BODY : ",body);
        // If not Successful

        if(body.success !== undefined && !body.success){
            return res.json({"success":false, "msg":"failed captcha verification"});
        }

        // If Successful
        return res.json({"success":true, "msg":"captcha done"});
    })
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
})