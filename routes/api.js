const express = require ('express');
const router = express.Router();
const Activity = require('../models/activity');

// get a list of ninjas from the db
router.get('/activities', function(req, res, next){
  Activity.find({}).then(function(activities){
    res.send(activities);
  });

});

// add a new ninja to the db
router.post('/activities', function(req, res, next){
    Activity.create(req.body).then(function(activity){
        res.send(activity);
    }).catch(next);
});

// update a ninja in the db
router.put('/activities/:id', function(req, res, next){
  Activity.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
      Activity.findOne({_id: req.params.id}).then(function(activity){
          res.send(activity);
      });
  }).catch(next);
});

// delete a ninja from the db
router.delete('/activities/:id', function(req, res, next){
  Activity.findByIdAndRemove({_id: req.params.id}).then(function(activity){
      res.send(activity);
  }).catch(next);
});




module.exports = router;
