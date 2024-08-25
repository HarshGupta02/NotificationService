const {kafka} = require('./client');

async function init() {
    // 1 consumer within this groupId is enough.
    const consumer = kafka.consumer({groupId: "Consumer-Group-Promotional"});
    await consumer.connect();
    await consumer.subscribe({
        topics: ["promotional-notifications"],
        fromBeginning: true
    });
    await consumer.run({
        eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
            console.log(`[${topic}] : PART:${partition}:`, message.value.toString());
        }
    });
}

init();