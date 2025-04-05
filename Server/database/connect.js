const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
    connect : async function() {
        try {
            await mongoose.connect(`mongodb+srv://admin:${process.env.MONGO}@c1.x8goeba.mongodb.net/?retryWrites=true&w=majority&appName=C1`);
            console.log(`${new Date().toString() }Connected to MongoDB`);
        } catch (err) {
            console.error(err);
        }
    }
}
