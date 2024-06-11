const express = require("express");
const configDB = require("./src/config");
const userRoute = require("./src/routes/user.route");
const userRedisRoute = require("./src/routes/user-redis.route");
require("dotenv").config();
const port = 3001;
const app = express();

app.use(express.json());
app.use("/mongodb", userRoute);
app.use("/redis", userRedisRoute);

configDB(process.env.MONGO_URI_ALAS);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

require("./src/queue/producer");
