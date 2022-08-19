const { User, Thought } = require("../models");

module.exports = {
  //get all users
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then(async (user) => {
        const userObj = {
          user,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //get single user
  getUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .then(async (user) => {
        const userObj = {
          user,
        };
        if (!userObj) {
          res.status(404).json({ message: "No such user exists" });
          return;
        }
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //post new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //update user
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, body, {
      new: true,
      runValidators: true,
    })
      .then(async (user) => {
        const userObj = {
          user,
        };
        if (!userObj) {
          res.status(404).json({ message: "No such user exists" });
          return;
        }
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //delete user
  deleteUser(req, res) {
    Thought.deleteMany({ userId: req.params.id }).then(async () => {
      User.findOneAndDelete({ userId: req.params.id })
        .then(async (user) => {
          const userObj = {
            user,
          };
          if (!userObj) {
            res.status(404).json({ message: "No such user exists" });
            return;
          }
          return res.json(userObj);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    });
  },
  //post new user friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { userId: req.params.id },
      { $push: { friends: req.params.friendsId } },
      { new: true }
    )
      .then(async (user) => {
        const userObj = {
          user,
        };
        if (!userObj) {
          res.status(404).json({ message: "No such user exists" });
          return;
        }
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //delete friend
  removeFriend(req, res) {
    User.findOneAndDelete(
      { userId: req.params.id },
      { $pull: { friends: req.params.friendsId } },
      { new: true }
    )
      .then(async (user) => {
        const userObj = {
          user,
        };
        if (!userObj) {
          res.status(404).json({ message: "No such user exists" });
          return;
        }
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
};
