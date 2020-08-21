const express = require('express')
const app = express()
const autoMailer = require('./verify');
const port = 3000

app.get('/verify-email', (req, res) => {
    autoMailer.verifyEmail(req,res);      
})

app.get("/is-user-get-email", async (req,res)=>{
    autoMailer.isUserReceivedEmail(req,res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})