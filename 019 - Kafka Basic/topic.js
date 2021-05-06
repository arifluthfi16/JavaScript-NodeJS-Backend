const {Kafka} = require("kafkajs")

run();
async function run(){
    try{
        const kafka = new Kafka({
            clientId : "myapp",
            brokers  :  [
                "localhost:9092"
            ]
        });

        // Establish admin instance
        const admin = kafka.admin();

        // Connect to kafka server
        console.log("Connecting . . .");
        await admin.connect();
        console.log("Connected!");

        // Create topics
        await admin.createTopics({
            topics : [{
                topic : "Users",
                numPartitions : 2,
            }]
        })

        console.log("Topic created successfully!");
        await admin.disconnect();


    }catch(err){
        console.error(`Something bad happen ${err}`)
    }finally{
        process.exit();
    }
}