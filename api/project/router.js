// build your `/api/projects` router here
const router = require('express').Router()
const Projects = require('./model')

router.post('/', (req, res, next) => {
    const { project_name, project_completed, project_description } = req.body

    if (!project_name){
        res.status(400).json({
            message: "must have a project_name",
        })
    }

    Projects.addNewProject({ project_name, project_completed: project_completed === null ||  project_completed === undefined ? 0 : project_completed, project_description })
        .then(newProject => {
                res.json({
                    ...newProject[0],
                    project_completed: newProject[0].project_completed === 0 ? false : true
                })
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Projects.getAllProjects()
        .then(result => {
            result = result.map((value) => {
                return {
                    ...value,
                    project_completed: value.project_completed === 0 ? false : true
                }
            }) 
            res.status(200).json(result)
        })
        .catch(next)
})

module.exports = router;