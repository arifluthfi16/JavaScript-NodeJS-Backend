const zmq = require('zeromq');

const sock = new zmq.Push();

run();
async function run(){
    await sock.bind("tcp://127.0.0.1:7000");
    console.log("Server is listening on localhost:7000");
    console.log("Press any key to continue");
    process.stdin.once("data", send);
}

// Send jobs to worker
async function send(){
    console.log("About to send jobs");

    for(let i=0; i<100;i++){
        await sock.send(`Job ${i}`);
        

        await new Promise(resolve => setTimeout(resolve,500))
    }
}