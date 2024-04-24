const users = require("../db/mock-users.js");

module.exports = {
  get: (req, res) => {
    res.send(users);
  },
};

module.exports.getUserByNickname = (req, res) => {
  const user = users.find(
    (userNick) => userNick.nickName === req.params.nickname
  );
  if (!user) {
    return res.status(404).send("User not found");
  }
  return res.json(user);
};

/*module.exports.getUserById = (req, res) => {
  const user = users.find((UserId) => UserId.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).send("User not found");
  }
  res.json(user);
};
*/
