const amqplib = require("amqplib");

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
    await channel.consume(
      nameQueue,
      (msg) => {
        console.log("msg:", msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = receiveQueue;
