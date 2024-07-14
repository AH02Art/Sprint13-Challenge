// add middlewares here related to projects
const Projects = require("./projects-model.js");

async function validateProjectId(request, response, next) {
    try {
        const project = await Projects.get(request.params.id);
        if (!project) {
            response.status(404).json({ message: `project with id ${request.params.id} doesn't exist` });
        } else {
            request.project = project;
            next();
        }
    } catch (error) {
        response.status(500).json({ message: "An error occurred inside of the projects router." })
    }
};

function validateProject(request, response, next) {
    const { name, description, completed } = request.body;
    if ( !name || !description || completed === undefined ) {
        response.status(400).json({ message: "Please provide the project name, description, and completion status." });
    } else {
        request.name = name;
        request.description = description;
        request.completed = completed;
        next();
    }    
}

module.exports = {
    validateProjectId,
    validateProject
};