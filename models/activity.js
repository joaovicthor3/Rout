const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema and Model


const ActivitySchema = new Schema({
  date: {
    type: String,
    default:  Date(Date.now())
  },
  name: String,
  mastery: Number,
  pleasure: Number,
  comment: String,

});

const Activity = mongoose.model('activities', ActivitySchema);

module.exports = Activity;
