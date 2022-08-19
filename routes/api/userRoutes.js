const router = require("express").Router();

const {
  getUsers,
  getUser,
  updateUser,
  createUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).put(updateUser).post(createUser);

// /api/users/:userId
router.route("/:id").get(getUser).delete(deleteUser);

module.exports = router;
