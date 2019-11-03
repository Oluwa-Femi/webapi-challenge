const express = require('express');
const router = express.Router();
const Actions = require('../data/helpers/actionModel')
const middleware = require('../middleware/middleware')

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(error => {
            res.status(500).json({
                'Error retrieving actions' : error.message
            });
        });
});

router.get('/:id', middleware.validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

router.delete('/:id', middleware.validateActionId, (req, res) => {
    Actions.remove(req.action.id)
        .then(num => {
            res.status(200).json({ message: `removed ${num} action` })
        })
        .catch(error => {
            res.status(500).json({
                'error removing action': error.message
            });
        });
});

router.put('/:id', [middleware.validateAction, middleware.validateActionId], (req, res) => {
    Actions.update(req.action.id, req.body)
        .then(editedProject => {
            res.status(200).json(editedProject)
        })
        .catch(error => {
            res.status(500).json({
                'error editing action': error.message
            });
        });
});

module.exports = router;