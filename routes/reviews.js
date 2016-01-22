var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
function Reviews(){
  return knex('reviews')
}


router.get('/:id/reviews', function(req, res, next){
  var id =req.params.id
    res.render('reviews/index', {id: id})

})
router.get('/:id/reviews/new', function(req, res, next){
  var id =req.params.id
  res.render('reviews/new', {id: id})
})

router.post('/:id/reviews', function(req, res, next){
  Reviews().insert({
    nameR:req.body.nameR,
    date:req.body.date,
    ratingR:req.body.ratingR,
    review:req.body.review,
    restaurant_id:req.params.id
  }).then(function(result){
    res.redirect('/restaurants/'+req.params.id+'/reviews')
  })
})



module.exports = router;
