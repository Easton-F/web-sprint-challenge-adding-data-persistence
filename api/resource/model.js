// build your `Resource` model here
const db = require('../../data/dbConfig')

function getAllResources() {
    return db('resources as rc')
        .select('rc.*')
}

function addNewResource(newResource) {
    return db('resources')
        .insert(newResource)
            .then(val  => {
                return getResourceById(val)
            })
}

function getResourceById(id) {
    return db('resources as rc')
        .where('resource_id', id)
        .select('rc.*')
}

module.exports = {
    getAllResources,
    addNewResource,
}