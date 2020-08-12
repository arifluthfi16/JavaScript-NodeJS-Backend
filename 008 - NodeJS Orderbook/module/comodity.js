// Comodity Class
const btc = {
    name : 'Bitcoin',
    price : 100,
    multiplier : 1,
    strength : 0.1
}

function setPrice(n){
    btc.price = n;
}

function setMult(n){
    btc.multiplier = n;
}

function setStr(n){
    btc.strength = n;
}

function addValue(amount){
    btc.price += btc.strength*amount;
}

function decValue(amount){
    btc.price -= btc.strength*amount;
}

function getPrice(){
    return btc.price;
}

module.exports = {
    btc,
    setPrice,
    setMult,
    setStr,
    addValue,
    decValue,
    getPrice
}