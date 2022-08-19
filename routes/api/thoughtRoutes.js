const router = require("express").Router();

const {
  getThoughts,
  getThought,
  updateThought,
  createThought,
  deleteThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).put(updateThought).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:id").get(getThought).delete(deleteThought);

module.exports = router;
