import {AVLTree, Tree} from 'avl';

const t = new Tree(); 
const tree = new AVLTree();

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