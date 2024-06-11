const { createClient } = require("redis");
let client;

(async () => {
  client = createClient({
    legacyMode: true,
    url: process.env.REDIS_URL,
  });
  client.on("connect", () => {
    console.log("Redis client connected");
  });

  client.on("error", (error) => {
    console.log("connect redis failed!");
    console.error(error);
  });
  await client.connect();
})();

module.exports = client;
