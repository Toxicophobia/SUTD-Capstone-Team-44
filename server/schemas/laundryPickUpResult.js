var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var laundryPickUpResultSchema = new Schema({
  //_id: Schema.Types.ObjectId, // or mongoose.Types.ObjectId
  avg_request_list: Array,
  avg_request_per_day: Number,
  avg_wait_time:Number, //In minute
  lastChangeTime:String
});

var laundryPickUpResultModel = module.exports = mongoose.model('Laundry Pick Up', laundryPickUpResultSchema, 'laundryPickUpResult');

laundryPickUpResultModel.log = async function(callback) {
  await laundryPickUpResultModel.find({}, callback);
}

laundryPickUpResultModel.latest = async function(callback) {
  await laundryPickUpResultModel.findOne({},null, {sort: {lastChangeTime: -1}}, callback);
}
