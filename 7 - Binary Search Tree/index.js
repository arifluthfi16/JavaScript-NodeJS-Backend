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

let binTree = new Tree();
binTree.addNode(5);
binTree.addNode(7);
binTree.addNode(4);
binTree.addNode(6);
binTree.addNode(3);
binTree.addNode(1);
binTree.addNode(2);

console.log(binTree);