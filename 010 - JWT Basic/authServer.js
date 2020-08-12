require('dotenv').config()

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

// Normaly this will be saved in redis / a database
let refreshTokens = [

];

app.post('/token',(req,res)=>{
    const refreshToken = req.body.token;

    if(refreshToken == null) return res.sendStatus(401);

    if(!refreshTokens.includes(refreshToken)){
        res.sendStatus(403);
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err,user)=>{
        if(err) return res.sendStatus(403);

        const accessToken = generateAccessToken({name: user.name})
        res.json({
            accessToken
        })
    })
});

app.post('/login', (req,res)=>{
    // Aunthenticate User

    const username = req.body.username;
    const user = {
        name : username
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
    res.json({accessToken, refreshToken});
});

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '30s'
    });
    
}

app.delete('/logout', (req,res)=>{
    // Simply delete the certain logout user from the database / redis cache
    // But here since it is saved locally we just need to empty the refresh tokens array

    refreshTokens = refreshTokens.filter(token => {
        token !== req.body.token
    });
    res.sendStatus(204);
})




app.listen(4000);