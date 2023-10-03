// build your `Project` model here
const db = require('../../data/dbConfig')

function getAllProjects() {
    return db('projects as pj')
        .select('pj.*')
}

module.exports = {
    getAllProjects,
}