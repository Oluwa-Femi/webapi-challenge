const express = require('express');

const router = express.Router();
const Projects = require('../data/helpers/projectModel');
const Actions = require('../data/helpers/actionModel')
const middleware = require('../middleware/middleware')

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({
                'Error retrieving projects': error.message
            });
        });
});

router.get('/:id', middleware.validateProjectId, (req, res) => {
    res.status(200).json(req.project)
});

router.get('/:id/actions', middleware.validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json({
                'Error getting actions of project': error.message
            })
        })
})

router.post('/', middleware.validateProject, (req, res) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({
                'Error adding project' : error.message
            });
        });
});

router.post('/:id/actions', [middleware.validateProjectId, middleware.validateAction], (req, res) => {
    const postInfo = { ...req.body, project_id: req.params.id }

    Actions.insert(postInfo)
        .then(action => {
            res.status(210).json(action);
        })
        .catch(error => {
            res.status(500).json({
                'error posting to project': error.message
            });
        });
});

router.delete('/:id', middleware.validateProjectId, (req, res) => {
    Projects.remove(req.project.id)
        .then(info => {
            res.status(200).json({ message: `removed ${info} project` })
        })
        .catch(error => {
            res.status(500).json({
                'error removing project': error.message
            });
        });
});

router.put('/:id', [middleware.validateProjectId, middleware.validateProject], (req, res) => {
    Projects.update(req.project.id, req.body)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({
                'error updating project': error.message
            });
        });
});

module.exports = router;