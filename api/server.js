const express = require('express');
const server = express();

server.use(express.json());
server.disable("x-powered-by");

const projectsRouter = require("./projects/projects-router.js");
server.use("/api/projects", projectsRouter);
const actionsRouter = require("./actions/actions-router.js");
server.use("/api/actions", actionsRouter);

server.get("/alex", function(request, response) {
    response.send(`<h1>Alex was here...</h1>`);
});

server.use(function(request, response) {
    response.status(404).json({ message: "page not found" });
});

module.exports = server;
