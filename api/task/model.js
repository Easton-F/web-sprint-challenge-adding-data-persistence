// build your `Task` model here
const db = require('../../data/dbConfig')


function getAllTasks() {
    return db('tasks as tk')
        .join('projects', 'tk.project_id', '=', 'projects.project_id')
        .select('*')
}

function addNewTask(newTask) {
    return db('tasks')
        .insert(newTask)
            .then(val => {
                return getTaskById(val)
            })
}

function getTaskById(id) {
    return db('tasks as tk')
        .where('task_id', id)
        .select('tk.*')
}

module.exports = {
    getAllTasks,
    addNewTask
}