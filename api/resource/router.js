// build your `/api/resources` router here
const router = require('express').Router()
const Resources = require('./model')

router.post('/', (req, res, next) => {
    const { resource_name, resource_description } = req.body

    if (!resource_name){
        res.status(400).json({
            message: "must have a resource_name",
        })
    }

    Resources.addNewResource({ resource_name, resource_description })
        .then(newResource => {
                res.json(newResource[0])
        })
        .catch(next)
})

router.get('/', (req, res, next) => {
    Resources.getAllResources()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(next)
})

module.exports = router;