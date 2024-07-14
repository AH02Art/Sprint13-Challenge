// Write your "projects" router here!
const express = require("express");
const Projects = require("./projects-model.js");

const { validateProjectId, validateProject } = require("./projects-middleware.js");

const router = express.Router();

router.get("/alex", function(request, response) { // testing the router
    response.json({
        message: "Alex was here in JSON format!",
        developer: "Alex"
    });
})

router.get("/", function(request, response, next) {
    Projects.get()
        .then((data) => {
            response.status(200).json(data);
        })
        .catch(next)
})

router.get("/:id", validateProjectId, function(request, response) {
    response.json(request.project);
})

router.post("/", validateProject, function(request, response, next) {
    Projects.insert({ 
            name: request.name, 
            description: request.description,
            completed: request.completed
        })
        .then((data) => {
            response.status(201).json(data)
        })
        .catch(next)
})

router.put("/:id", validateProjectId, validateProject, function(request, response, next) {
    Projects.update(request.params.id, { 
        name: request.name, 
        description: request.description,
        completed: request.completed
    })
    .then((updatedProject) => {
        response.json(updatedProject);
    })
    .catch(next)
})

router.delete("/:id", validateProjectId, async function(request, response, next) {
    try {
        await Projects.remove(request.params.id);
        response.json(request.projects);
    } catch (error) {
        next(error);
    }
})

router.get("/:id/actions", validateProjectId, async function(request, response, next) {
    try {
        const projectActions = await Projects.getProjectActions(request.params.id);
        response.json(projectActions);
    } catch (error) {
        next(error);        
    }
})

router.use(function(error, request, response, next) {
    response.status(error.status || 500).json({
      message: error.message,
      customMessage: "An error occurred inside of the projects router."
    });
})

module.exports = router;