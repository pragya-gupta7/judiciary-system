const router = require("express").Router();
const User = require("../models/user.model");

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;

  User.findOne({ username: req.body.username, password: req.body.password })
    .then((existingUser) => {
      if (existingUser) {
        res.status(400).json({
          error:
            "a user with the email " +
            username +
            " already exists with type: " +
            existingUser.type,
        });
      } else {
        createUser(username, password, type, res);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

function createUser(username, password, type, res) {
  const newUser = new User({
    username,
    password,
    type,
  });
  newUser.save(function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json("User added");
    }
  });
}

router.route("/login").post((req, res) => {
  console.log(req.body);
  User.findOne({
    username: req.body.username,
    password: req.body.password,
    type: req.body.type || "Lawyer",
  })
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.json({ username: doc.username, success: true });
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => res.status(400).json("failed"));
});

module.exports = router;
