const amqplib = require("amqplib");
const client = require("../config-redis");
const redisService = require("../services/redis.service");
const amqp_lib_cloud = process.env.AMPQ_LIB_CLOUD;
const amqp_lib_docker = "";
const receiveQueue = async () => {
  try {
    //1. create connect
    const conn = await amqplib.connect(amqp_lib_cloud);
    //2. create chanel
    const channel = await conn.createChannel();
    //3. create name queue
    const nameQueue = "node-queue";
    //4. create queue
    await channel.assertQueue(nameQueue, {
      durable: false,
    });
    //5. send to queue
    await channel.consume(nameQueue, (msg) => {
      if (msg != null) {
        const event = JSON.parse(msg.content.toString());
        console.log("Received event:", event);
        handleEvent(event);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log(error);
  }

  function handleEvent(event) {
    const { operationType, fullDocument, documentKey, updateDescription } =
      event;
    switch (operationType) {
      case "insert":
        async function addUserRedis(fullDocument) {
          try {
            await redisService.addUserRedis({
              key: fullDocument._id,
              value: {
                name: fullDocument.name,
                age: fullDocument.age,
                gender: fullDocument.gender,
              },
            });
          } catch (error) {
            console.log(error);
          }
        }
        addUserRedis(fullDocument);
        break;
      case "update":
        async function updateUserRedis(documentKey, updateDescription) {
          const key = documentKey._id;
          try {
            await redisService.updateUser({
              key,
              value: updateDescription.updatedFields,
            });
          } catch (error) {
            console.log(error);
          }
        }
        updateUserRedis(documentKey, updateDescription);
        break;
      case "delete":
        client.del(documentKey._id.toString(), (err, reply) => {
          if (err) console.error(err);
          console.log(`Document deleted from Redis:`, reply);
        });
        break;
      default:
        console.log(`Unhandled operation type: ${operationType}`);
    }
  }
};

receiveQueue();
