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
    Thought.findOne({ _id: req.params.id })
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
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body._id },
          { $addToSet: { thoughts: thought._id } }, //insert unless already exists
          {
            new: true,
            runValidators: true,
          }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought created, but found no user with that ID",
            })
          : res.json("Created the thought 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //update
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    )
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
    Thought.findOneAndRemove({ _id: req.params.id }).then(async (thought) => {
      const thoughtObj = {
        thought,
      };
      if (!thoughtObj) {
        res.status(404).json({ message: "No such thought exists" });
        return;
      }
      return User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        {
          new: true,
          runValidators: true,
        }
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
    });
  },
  //add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },
  //delete reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.json(err));
  },
};
