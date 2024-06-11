const express = require("express");
const router = express.Router();
const redisController = require("../controllers/user-redis.controller");

router.post("/users", redisController.addUserRedis);
router.put("/users/:key", redisController.updateUserRedis);
router.delete("/users/:key", redisController.deleteUserRedis);
router.get("/users/:key", redisController.getUserRedis);

module.exports = router;
