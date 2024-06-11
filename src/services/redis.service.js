const client = require("../config-redis");
const md5 = require("md5");
const redisService = {
  addUserRedis: async ({ key, value }) => {
    try {
      return new Promise((resolve, reject) => {
        client.exists(key, (err, rs) => {
          if (err) return reject(err);
          if (rs == 1) {
            return resolve({ msg: "user existed!" });
          }
        });

        client.hset(
          key,
          [
            "user_id",
            key,
            "name",
            value.name,
            "age",
            value.age,
            "gender",
            value.gender,
          ],
          (err, rs) => {
            return !err ? resolve(rs) : reject(err);
          }
        );
      });
    } catch (error) {}
  },
  updateUserRedis: async ({ key, value }) => {
    try {
      return new Promise((resolve, reject) => {
        client.exists(key, (err, rs) => {
          if (err) return reject(err);
          if (rs == 1) {
            client.hset(
              key,
              [
                "user_id",
                key,
                "name",
                value.name,
                "age",
                value.age,
                "gender",
                value.gender,
              ],
              (err, rs) => {
                return !err ? resolve(rs) : reject(err);
              }
            );
          } else return resolve({ msg: "user does not existed!" });
        });
      });
    } catch (error) {}
  },
  deleteUserRedis: async (key) => {
    try {
      return new Promise((resolve, reject) => {
        client.exists(key, (err, rs) => {
          if (err) return reject(err);
          if (rs == 1) {
            client.del(key, (err, rs) => {
              return !err ? resolve(rs) : reject(err);
            });
          } else return resolve({ msg: "user does not exists!" });
        });
      });
    } catch (error) {}
  },
  getUserRedis: async (key) => {
    try {
      return new Promise((resolve, reject) => {
        client.hgetall(key, (err, rs) => {
          return !err ? resolve(rs) : reject(err);
        });
      });
    } catch (error) {}
  },
};

module.exports = redisService;
