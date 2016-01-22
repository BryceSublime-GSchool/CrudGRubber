var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
function Restaurants(){
  return knex('places')
}

/* GET users listing. */
router.get('/index', function(req,res,next){
  Restaurants().select().then(function(result){
    res.render('restaurants/index', {places: result})
  })
})

router.get('/new', function(req, res, next) {
  res.render('restaurants/new')
})


router.post('/index', function(req, res, next) {
  Restaurants().insert({
    name:req.body.name,
    streetOne:req.body.streetOne,
    streetTwo:req.body.streetTwo,
    zip:req.body.zip,
    city:req.body.city,
    state:req.body.state,
    cuisine:req.body.cuisine,
    rating:req.body.rating,
    img:req.body.img,
    bio:req.body.bio,
    neighborhoodId:req.body.neighborhoodId
 }, 'id').then(function(result){
     res.redirect('/restaurants/index');
   })
})

router.get('/:id', function(req, res, next){
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
     res.render('restaurants/show', {id:id, name:name, city:city, state:state, cuisine:cuisine, rating:rating, img:img, bio:bio, neighborhood:neighborhood})
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
         cuisine:cuisine,
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
    res.redirect('/restaurants/index')
  })
})



module.exports = router;
