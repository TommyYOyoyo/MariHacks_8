// User Schema for mongoose

const mongoose = require("mongoose");

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
                // Insert users template var here
        }
);

module.exports = mongoose.model("User", userSchema); // (Collection_name, schema)