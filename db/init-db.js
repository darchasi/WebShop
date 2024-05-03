const { insertUsers } = require("./db-connection");
const users = require("./mock-users");

insertUsers(users)
  .then(() => {
    console.log("Users have been successfully inserted.");
  })
  .catch((error) => {
    console.error("Failed to insert users:", error);
  });
