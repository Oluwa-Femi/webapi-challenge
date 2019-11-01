const express = require("express"); 

const projectModel = require("./data/helpers/projectModel");
const actionModel = require("./data/helpers/actionModel");
const db = require("./data/dbConfig.js");
const validateProjects = require("./auth/validateProjects");  
// import middleware above

const router = express.Router(); 
// router.use(express.json());


//fetching project information using get()
router.get("/", (req, res) => {
    projectModel
    .get()
    .then(student => {
        res.status(200).json(student)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })
}) 


// creating new name and description using post()
router.post("/", validateProjects, (req, res) => {
    const body = req.body; 

    projectModel
    .insert(body)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })
})

router.get("/:id", (req, res) => {
    const { id } = req.params; 
    projectModel
    .get(id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({message: "Projects with specified id not found"})
        }
    }) 
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })
})

// .put() editing the specific projects with ID 
router.put('/:id', (req, res) => {
    const { id } = req.params; 
    const edit = req.body;

    if(!edit.name && !edit.description){
        res.status(400).json({message: "Please include a name or a description with maximum 128 characters"})
    } else {

    projectModel

    .update(id, edit)
        .then(projects => {
            if(projects) {
                
                res.status(200).json(projects);
            } else {
                res.status(404).json({message: "Project with specified id not found"});
            };
        })
        .catch(err => {
            console.log("Edit Project Error:", err)
            res.status(500).json({error: "Error with server while updating data"})
        });
    }
});

// .delete() deleting projects
router.delete("/:id", (req, res) => {
    const { id } = req.params; 

    projectModel
    .remove(id)
    .then(deleted => {
        if(deleted > 0) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({message: "The project with the specified ID could not be found"})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "error with server"})
    })
})

router.get("/:id/actions", (req, res) => {
    const { id } = req.params;  

    projectModel
    .getProjectActions(id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "server with error"})
    })
})

module.exports = router;