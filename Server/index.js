const express = require("express");
const app = express();
const { connect } = require("./database/connect.js");

// Connect to database
connect();

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
