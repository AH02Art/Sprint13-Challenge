const Actions = require("./actions-model.js");

async function validateActionId(request, response, next) {
    try {
        const action = await Actions.get(request.params.id);
        if (!action) {
            response.status(404).json({ message: `that action isn't found inside of project ${request.params.id}` })
        } else {
            request.action = action;
            next();
        }
    } catch (error) {
        response.status(500).json({ message: "An error occurred inside of the actions router." })
    }
}

function validateAction(request, response, next) {
    const characterCapacity = 128;
    const { project_id, description, notes, completed } = request.body;
    if ( !project_id || !description || !notes || completed === undefined ) {
        response.status(400).json({ message: "Please provide the action's project_id, description, notes, and completion status." });
    } else if (description.length > characterCapacity) {
        response.status(400).json({ message: `Description cannot exceed character length of ${characterCapacity}.` })
    } else {
        request.project_id = project_id;
        request.description = description;
        request.notes = notes;
        request.completed = completed;
        next();
    } 
}

module.exports = {
    validateActionId,
    validateAction
};