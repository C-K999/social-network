# Social Network API Framework

This is an API for a social network web application where users can share their thoughts, react to other users' thoughts, and create a friend list.

## Table of Contents

- [Technologies Used](#technologies)
- [Demo](#demo)
- [Developer Information](#developer)
- [Credits](#credits)
- [License](#license)

## Technologies

- Javascript
- Node
- NPM
- Express
- MongoDB
- Insomnia (demo)

## Demo

A view of the social network API, with the users displayed.

![site demo](/assets/demo1.png)

A view of the social network API, with the thoughts displayed.

![site demo](/assets/demo2.png)

### Code Snippets

In order to showcase how closely intertwined the "User" and "Thought" models are, here is an example of the code behind the functionality of deleting a user from the database. As seen below, deleting a user would not only remove the user from the database, but all of the associated "thought" posts as well.

```java
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
```

## Developer

### **Clement Koo**

[LinkdIn](https://www.linkedin.com/in/clement-t-k-459322138/) |
[GitHub](https://github.com/C-K999)

## Credits

UCB - Coding Bootcamp

---

© 2022 Clement Koo. All Rights Reserved.
