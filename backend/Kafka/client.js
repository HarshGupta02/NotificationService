const {Kafka} = require('kafkajs');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config({path : path.resolve(__dirname, '../../.env')});

const KAFKA_HOSTED_IP_ADDRESS = process.env.KAFKA_HOSTED_IP_ADDRESS;

exports.kafka = new Kafka({
    clientId: "Notification-Service",
    brokers: [KAFKA_HOSTED_IP_ADDRESS],
});