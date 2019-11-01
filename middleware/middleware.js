const Projects = require('../data/helpers/projectModel')
const Actions = require('../data/helpers/actionModel')

module.exports = {
    validateProjectId(req, res, next) {
        Projects.get(req.params.id)
            .then(project => {
                if(project) {
                    req.project = project;
                    next();
                } else {
                    res.status(404).json({ message: "invalid project id" });
                }
            })
            .catch(error => {
                res.status(500).json({
                    'something went wrong quering db': error.message
                });
            });
    },

    validateProject(req, res, next) {
        if(!req.body) {
            res.status(400).json({ message: "missing project data" })
        } else if(!req.body.name || !req.body.description) {
            res.status(400).json({ message: "missing required field" })
        } else {
            next();
        };
    },

    validateAction(req, res, next) {
        if(!req.body) {
            res.status(400).json({ message: "missing action data" })
        } else if(!req.body.notes || !req.body.description) {
            res.status(400).json({ message: "missing required field" })
        } else {
            next();
        }
    },

    validateActionId(req, res, next) {
        Actions.get(req.params.id)
            .then(action => {
                if(action) {
                    req.action = action;
                    next();
                } else {
                    res.status(404).json({ message: "invalid action id" });
                }
            })
            .catch(error => {
                res.status(500).json({
                    'something went wrong quering db': error.message
                });
            });
    },
};