// build your `/api/tasks` router here
const router = require('express').Router()
const Tasks = require('./model')
const Projects = require ('../project/model')

router.post('/', async (req, res, next) => {
    const { task_description, task_notes, task_completed, project_id } = req.body
        if(!task_description) {
            res.status(400).json({
                message: "Task description is missing"
            })
        }
        if(!project_id) {
            res.status(400).json({
                message: "Task project is missing",
            })
        }
    Projects.getProjectById(project_id)
        .then(tasksProject => {
            if(tasksProject === null || tasksProject?.length === 0) {
                res.status(400).json({
                     message: "Task project is invalid",
                })
            }
            Tasks.addNewTask({ task_description, task_completed: task_completed === null ||  task_completed === undefined ? 0 : task_completed, task_notes, project_id })
            .then(newTask => {
                    res.json({
                        ...newTask[0],
                        task_completed: newTask[0].task_completed === 0 ? false : true
                    })
            })
            .catch(next)
        }) 
        .catch(next)
})

router.get('/', (req, res, next) => {
    Tasks.getAllTasks()
        .then(result => {
            result = result.map((value) => {
                return {
                    ...value,
                    task_completed: value.task_completed === 0 ? false : true
                }
            }) 
            res.status(200).json(result)
        })
})

module.exports = router;