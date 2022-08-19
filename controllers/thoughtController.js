const { User, Thought } = require("../models");

module.exports = {
  //get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .select("-__v")
      .then(async (thought) => {
        const thoughtObj = {
          thought,
        };
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //get single thought
  getThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .then(async (thought) => {
        const thoughtObj = {
          thought,
        };
        if (!thoughtObj) {
          res.status(404).json({ message: "No such thought exists" });
          return;
        }
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //post new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(async (thought) => {
        const thoughtObj = {
          thought,
        };
        if (!thoughtObj) {
          res.status(404).json({ message: "No such thought exists" });
          return;
        }
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //update
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then(async (thought) => {
        const thoughtObj = {
          thought,
        };
        if (!thoughtObj) {
          res.status(404).json({ message: "No such thought exists" });
          return;
        }
        return res.json(thoughtObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //delete
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }).then(
      async (thought) => {
        const thoughtObj = {
          thought,
        };
        if (!thoughtObj) {
          res.status(404).json({ message: "No such thought exists" });
          return;
        }
        return User.findOneAndDelete(
          { _id: req.body.userId },
          { $pull: { thoughts: _id } },
          { new: true }
        ).then(async (user) => {
          const userObj = {
            user,
          };
          if (!userObj) {
            res.status(404).json({ message: "No such user exists" });
            return;
          }
          return res.json(userObj);
        });
      }
    );
  },
};
