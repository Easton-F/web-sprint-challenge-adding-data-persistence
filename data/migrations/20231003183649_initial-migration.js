exports.up = async function(knex) {
  await knex.schema
    .createTable('projects', tbl  => {
        tbl.increments('project_id')
        tbl.string('project_name', 250).notNullable()
        tbl.string('project_description', 500)
        tbl.boolean('project_completed').defaultTo(false)
    })
    .createTable('resources', tbl  => {
        tbl.increments('resource_id')
        tbl.string('resource_name', 250).notNullable().unique()
        tbl.string('resource_description', 500)
    })
    .createTable('tasks', tbl  => {
        tbl.increments('task_id')
        tbl.string('task_description', 500).notNullable()
        tbl.string('task_notes', 500)
        tbl.boolean('task_completed').defaultTo(false)
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
    .createTable('project_resources', tbl  => {
        tbl.increments('project_resources_id')
        tbl.integer('resource_id')
            .unsigned()
            .notNullable()
            .references('resource_id')
            .inTable('resources')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
        tbl.integer('project_id')
            .unsigned()
            .notNullable()
            .references('project_id')
            .inTable('projects')
            .onDelete('RESTRICT')
            .onUpdate('RESTRICT')
    })
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('project_resources')
        .dropTableIfExists('tasks')
        .dropTableIfExists('resources')
        .dropTableIfExists('projects')
};
