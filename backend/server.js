const express = require('express');
const cors = require('cors');
const {kafka} = require('./Kafka/client');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path : path.resolve(__dirname, '../.env')});

const API_SERVER_PORT = process.env.API_SERVER_PORT;

app.get("/", (req, res) => {
    return res.status(200).json({"msg" : "Home Route Working"});
});

app.post("/publish", async (req, res) => {
    const producer = kafka.producer();
    await producer.connect();
    try {
        let {messageType, priority} = req.body;
        if(!priority) priority = 0;
        await producer.send({ 
            topic: messageType,
            messages: [
                {
                    key: "transaction",
                    value: JSON.stringify({name: "Test", description : "This is a test event"}),
                    partition: priority,
                }
            ]
        });
    } catch (error) {
        console.log(`The Error Message is ${error}`);
        await producer.disconnect();
        return res.status(500).json(error);
    }
    await producer.disconnect();
    return res.status(200).json({"msg" : "Notification Published Successfully To Kafka"});
});

app.listen(API_SERVER_PORT, () => {
    console.log(`API Server is running on PORT ${API_SERVER_PORT}`);
});