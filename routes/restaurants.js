var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
function Restaurants(){
  return knex('places')
}



/* GET users listing. */
router.get('/', function(req,res,next){
  Restaurants().select().then(function(results){
    res.render('restaurants/index', {restaurants: results})
  })
})

router.get('/new', function(req, res, next) {
  res.render('restaurants/new')
})


router.post('/', function(req, res, next) {
  var errors = [];
  if (!req.body.name.trim()){errors.push('name cannot be blank')}
  if(errors.length){
    res.render('resturants/new', {userInput: req.body})
  } else {
    Restaurants().insert(req.body).then(function(result){
      res.redirect('/restaurants');
})}
   });


router.get('/:id', function(req, res, next){
  Restaurants().where('id', req.params.id).first().then(function(restaurant){
    res.render('restaurants/show', {restaurant: restaurant})
 })
})

router.get('/:id/edit', function(req, res, next){
  Restaurants().where('id', req.params.id).first().then(function(result){
       var id = result.id
       var name = result.name
       var city = result.city
       var state = result.state
       var cuisine = result.cuisine
       var rating = result.rating
       var img = result.img
       var bio = result.bio
       var neighborhood = result.neighborhood
       res.render('restaurants/edit', {
         id:id,
         name:name,
         city:city,
         state:state,
          rating:rating,
         img:img,
         bio:bio,
         neighborhood:neighborhood
       })
   })
})

router.post('/:id', function(req, res, next){
  Restaurants().where('id', req.params.id).update(req.body)
  .then(function(result){
    res.redirect('/restaurants/'+ req.params.id)
  })
})


router.post('/:id/delete', function(req, res, next){
  Restaurants().where('id', req.params.id).del().then(function(results){
    res.redirect('/restaurants')
  })
})



module.exports = router;
