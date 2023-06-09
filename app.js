const express = require("express");
const app = express();

app.get("/", function(request, respond) {
    respond.send("Hello world.");
});





app.listen(3000, function() {
    console.log("Server is running, listening to port 3000");
});