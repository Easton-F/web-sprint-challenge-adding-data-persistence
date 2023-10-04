// build your `Project` model here
const db = require('../../data/dbConfig')

function getAllProjects() {
    return db('projects as pj')
        .select('pj.*')
}

function addNewProject(newProject) {
    return db('projects')
        .insert(newProject)
            .then(val  => {
                return getProjectById(val)
            })
}

function getProjectById(id) {
    return db('projects as pj')
        .where('project_id', id)
        .select('pj.*')
}

module.exports = {
    getAllProjects,
    addNewProject,
}