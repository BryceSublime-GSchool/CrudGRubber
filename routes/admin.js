var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var request = require('request');
function Employees(){
  return knex('employees')
}
function Restaurants(){
  return knex('restaurants')
}

router.get('/', function(req, res, next){
  res.render('admin/index')
})


module.exports = router;
