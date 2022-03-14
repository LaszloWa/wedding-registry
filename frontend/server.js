const express = require("express");
const path = require("path");

const server = express();

server.use(express.static("public"));

// Handles any requests that don't match the ones above
server.get("*", (req, res) => {
	res.sendFile(path.join(__dirname + "/public/index.html"));
});

server.listen(8888, () => console.log("Listening on port :8888"));
