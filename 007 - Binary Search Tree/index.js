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
    console.log("FOUND : "+node.val);
    return lookfor(n,node.left);
}

// Function wrapper
function wrapper(n,node){
    console.time();
    lookfor(n,node);
    console.timeEnd();
}

let binTree = new Tree();
var root = binTree.root;

for(let i = 1; i<100; i++){
    binTree.addNode(Math.floor(Math.random(1,100)*100));
}


// binTree.addNode(10);
// binTree.addNode(3);
// binTree.addNode(12);
// binTree.addNode(1);
// binTree.addNode(4);
// binTree.addNode(11);
// binTree.addNode(15);
// binTree.addNode(13);

// BFS Traversal
// Literally BFS is a Node Exploration Method
// Wether we want to explore a path to a particular node 
// Or maybe every node in general
// Level Order Traversal
function bfs(node){
    if(node == null){
        return;
    }

    let queue = [node];

    while(queue.length > 0){
        let item = queue.shift()
        let value = item.val;
        console.log(value);

        if(item.left == null & item.right == null){
            continue;
        }
        if (item.left != null) {    
            queue.push(item.left)
        }
        if (item.right != null) {
        queue.push(item.right)
        }

    }
}
p
// DFS
traverseInOrder(binTree.root);