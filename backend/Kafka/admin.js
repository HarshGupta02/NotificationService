const {kafka} = require("./client");

async function init() {
    try {
        const admin = kafka.admin();
        await admin.connect();
        console.log("Admin Connected");
        await admin.createTopics({
            topics: [
                {
                    topic: "transactional-notifications",
                    numPartitions: 3,
                },
                {
                    topic: "promotional-notifications",
                    numPartitions: 1
                }
            ]
        });
        console.log("Created Both Topics");
        await admin.disconnect();
        console.log("Admin Disconnected");
    } catch (error) {
        console.log("The error message is ", error);
    }
}

init();