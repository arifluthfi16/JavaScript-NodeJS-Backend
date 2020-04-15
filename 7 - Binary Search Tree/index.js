class Node{
    constructor(num){
        this.val = num;
        this.left = null;
        this.right = null;
    }

    addNode(node){
        if(node.val < this.val){
            if(this.left == null){
                this.left = node;
            }else{
                this.left.addNode(node);
            }
        }else{
            if(this.right == null){
                this.right = node;
            }else{
                this.right.addNode(node);
            }
        }
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    addNode(x){
        let n = new Node(x);
        if(this.root == null){
            this.root = n;
        }else{
            this.root.addNode(n);
        }
    }
}

function traversePreOrder(node){
        if(node == null){
            return;
        }
        console.log(node.val);
        traversePreorder(node.left);
        traversePreorder(node.right);
}

function traverseInOrder(node){
    if(node == null){
        return;
    }

    traverseInOrder(node.left);
    console.log(node.val);
    traverseInOrder(node.right);
}

function printDesc(node){
    if(node == null){
        return;
    }

    printDesc(node.right);
    console.log(node.val);
    printDesc(node.left);
}

function traversePostOrder(node){
    if(node == null){
        return;
    }

    traversePostOrder(node.left);
    traversePostOrder(node.right);
    console.log(node.val);
}

// Search Function
function lookfor(n,node){
    if(node == null){
        return;
    }
    if(node.val == n){
        return node;
    }

    if(node.val < n){
        return lookfor(n,node.right);
    }

    return lookfor(n,node.left);
}

let binTree = new Tree();
var root = binTree.root;

for(let i = 1; i<10; i++){
    binTree.addNode(Math.floor(Math.random(1,100)*100));
}

console.log(binTree);
traverseInOrder(binTree.root);