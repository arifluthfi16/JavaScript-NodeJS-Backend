import AVLTree from 'avl';

// var t = new AVLTree(); 

// Order Book Structure

function createNewOrder(price, amount){
    // Constrcut new orderbook
    let limitOrder = {
        price,
        amount,
        orderTime : Date.now()
    }

    t.insert(price, limitOrder);
}

for(i=1; i<10; i++){
    createNewOrder(Math.floor(Math.random() * 100),  i);
}