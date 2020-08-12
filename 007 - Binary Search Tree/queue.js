class Queue{
    constructor(val){
        let n = new QueueNode(val);
        this.head = n;
        this.tail = n;
    }

    isempty(){
        if(this.head == null && this.tail == null){
            return true;
        }
        return false;
    }

    issingle(){
        if(this.head == this.tail){
            return true
        }
        return false;
    }

    eq(val){
        let n = new QueueNode(val);
        n.next = null;
        this.head.next = this.tail;
        this.tail.next = n;
        this.tail = n;
        return true;
    }

    dq(){
        let temp = this.head;   
        if(this.issingle()){
            this.head = null;
            this.tail = null;
            temp.next = null;
        }else{
            this.head = this.head.next;
            temp.next = null;
        }
        return(temp);
    }
}

class QueueNode{
    constructor(){
        this.val = null;
        this.next = null;
    }
}