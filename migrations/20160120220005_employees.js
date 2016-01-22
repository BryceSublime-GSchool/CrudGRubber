
exports.up = function(knex, Promise) {
  return knex.schema.createTable('employees', function(table){
    table.increments();
    table.string('name_f');
    table.string('name_l');
    table.string('position');
    table.string('restaurant_id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('employees')
};
