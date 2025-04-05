const express = require("express");
const app = express();
const cors = require("cors");
const { connect } = require("./database/connect.js");
const { registerUser } = require("./database/registerUser.js");
const UserModel = require("./database/models/User.js");
const bcrypt = require("bcrypt");

// Connect to database
connect();

app.use(express.json());
app.use(cors());

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});

app.post("/register", (req, res) => {
    registerUser(req.body.username, req.body.password, req.body.email)
    .then(users => res.json(users))
    .catch(err => res.json(err));
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if (user) {
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    res.json(user);
                } else {
                    res.json("Incorrect password");
                }
            })
            .catch(err => res.status(400).json(err));
        } else {
            res.json("User not found");
        }
    })
});
