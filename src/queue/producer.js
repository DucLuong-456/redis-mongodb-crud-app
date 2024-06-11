const amqplib = require("amqplib");
const mongoose = require("mongoose");
const amqp_lib_cloud = process.env.AMPQ_LIB_CLOUD;
const amqp_lib_docker = "";
const UserModel = require("../models/user.model");
const sendQueue = async () => {
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
    // Lắng nghe các thay đổi từ MongoDB
    const changeStream = UserModel.watch();
    changeStream.on("change", async (change) => {
      console.log("Change detected:", change);
      // Gửi sự kiện tới RabbitMQ
      await channel.sendToQueue(
        nameQueue,
        Buffer.from(JSON.stringify(change)),
        { persistent: true }
      );
    });

    console.log("Listening for changes...");
  } catch (error) {
    console.log(error);
  }
};

sendQueue();
