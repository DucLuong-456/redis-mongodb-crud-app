const redisService = require("../services/redis.service");
const redisController = {
  addUserRedis: async (req, res, next) => {
    try {
      const { key, payload } = req.body;
      return res.json({
        data: await redisService.addUserRedis({
          key,
          value: payload,
        }),
      });
    } catch (error) {
      next(error);
    }
  },
  updateUserRedis: async (req, res, next) => {
    try {
      const key = req.params.key;
      const { payload } = req.body;
      return res.json({
        data: await redisService.updateUserRedis({
          key,
          value: payload,
        }),
      });
    } catch (error) {
      next(error);
    }
  },
  deleteUserRedis: async (req, res, next) => {
    try {
      const key = req.params.key;
      const deleteUser = await redisService.deleteUserRedis(key);
      return res.json({
        user: deleteUser,
      });
    } catch (error) {
      next(error);
    }
  },
  getUserRedis: async (req, res, next) => {
    try {
      const key = req.params.key;
      return res.json({
        user: await redisService.getUserRedis(key),
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = redisController;
