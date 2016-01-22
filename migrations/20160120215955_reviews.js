
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table){
    table.increments();
    table.string('nameR');
    table.string('date');
    table.string('ratingR');
    table.string('restaurant_id');
    table.text('review');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('reviews')
};
