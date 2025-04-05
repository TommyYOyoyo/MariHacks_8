// User registration function, for new users

const User = require("./schemas/User.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports = {
    registerUser: async function (username, password, email) {
        try {
            // Create new user
            const user = new User({
                username: username,
                password: await bcrypt.hash(password, saltRounds),
                email: email,
            });
            // Await user.save() to save user to database
            await user.save();
        } catch (err) {
            console.error(err);
        }
    },
};