const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { getUserName, getEmail, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];

  for (let i = 0; i < 5; i++) {
    const username = getUserName(i);
    const email = getEmail(i);
    const thought = getRandomThoughts;

    users.push({
      username,
      email,
      thought,
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
