const {kafka} = require('./client');

async function init() {
    // try to scale the number of consumers in this groupId so that transactional messages can be processed faster.
    const consumer = kafka.consumer({groupId: "Consumer-Group-Transactional"});
    await consumer.connect();
    await consumer.subscribe({
        topics: ["transactional-notifications"],
        fromBeginning: true
    });
    await consumer.run({
        eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
            console.log(`[${topic}] : PART:${partition}:`, message.value.toString());
        }
    });
}

init();