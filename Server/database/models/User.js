// User Schema for mongoose

const mongoose = require("mongoose");

function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const userSchema = new mongoose.Schema(
        {
            username: String,                           // Username
            email: String,                              // Email
            password: String,                           // Password
            registeredAt: {                             // Registered date
                type: String,
                immutable: true,
                default: new Date().toString(),
            },
            timers: {                                   // Timers
                type: Array,
                default: [],
            },

            isCommissionFinish: {
                type: Boolean,
                default: false,
            },

            commissions:{
                type: Array,
                default: [{name: "Study 1h (Study Timer)", exp: 10}, 
                    {name: "Read 30 mins (Study Timer)", exp: 5},
                    {name: "Use whiteboard 30 mins", exp: 5}],
            },

            commissionToComplete:{
                type: String,
                default: "Study 1h (Study Timer)"
            }
                // Insert users template var here
        }
);

module.exports = mongoose.model("User", userSchema); // (Collection_name, schema)