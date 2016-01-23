
exports.up = function(knex, Promise) {
  return knex.schema.createTable('neighborhoods', function(table){
    table.increments();
    table.string('nameN');
    table.string('epicenter');
    table.integer('restaurant_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('neighborhoods')
};
