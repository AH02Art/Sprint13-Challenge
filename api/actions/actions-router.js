const express = require("express");
const Actions = require("./actions-model.js");
const { validateActionId, validateAction } = require("./actions-middlware.js");
const router = express.Router();

router.get("/jacob", function(request, response) { // testing the router
    response.json({
        message: "Jacob is my brother, who is also taking the Full-Stack Web Development course with me!",
        developer: "Jacob",
        brother: "Alex"
    });
})

router.get("/", function(request, response, next) {
    Actions.get()
        .then((data) => {
            response.status(200).json(data);
        })
        .catch(next)
})

router.get("/:id", validateActionId, function(request, response) {
    response.json(request.action);
})

router.post("/", validateAction, function(request, response, next) {
    Actions.insert({
        project_id: request.project_id,
        description: request.description,
        notes: request.notes,
        completed: request.completed
    })
    .then((stuff) => {
        response.status(201).json(stuff);
    })
    .catch(next)
})

router.put("/:id", validateActionId, validateAction, function(request, response, next) {
    Actions.update(request.params.id, {
        project_id: request.project_id,
        description: request.description,
        notes: request.notes,
        completed: request.completed
    })
    .then((updatedProject) => {
        response.json(updatedProject);
    })
    .catch(next)    
})

router.delete("/:id", validateActionId, async function(request, response, next) {
    try {
        await Actions.remove(request.params.id);
        response.json(request.action);       
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