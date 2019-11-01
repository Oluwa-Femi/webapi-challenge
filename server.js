const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const router = require("./router.js");

server.use(logger);
server.use(helmet());
server.use(express.json());
server.use(cors())
server.use("/api/projects", router)

// middleware
function logger(req, res, next) {
    console.log(`${req.method} to ${req.path}`)
    next()
}

server.get("/", (req, res) => {
    res.status(200).json({ message: "Server is working" });
  });
  
module.exports = server;