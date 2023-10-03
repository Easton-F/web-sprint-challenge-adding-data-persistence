// build your `/api/projects` router here
const router = require('express').Router()
const Projects = require('./model')

router.post('/', (req, res, next) => {

})

router.get('/', (req, res, next) => {
    Projects.getAllProjects()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
})

module.exports = router;