var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var temperatureResultSchema = new Schema({
  //_id: Schema.Types.ObjectId, // or mongoose.Types.ObjectId
  updated_time: String,
  temperature: Number,
  MSE: Number
});

var temperatureResultModel = module.exports = mongoose.model('Temperature Results', temperatureResultSchema, 'temperatureResult');

temperatureResultModel.log = async function(callback) {
  await temperatureResultModel.find({}, callback);
}

temperatureResultModel.latest = async function(callback) {
  await temperatureResultModel.findOne({},null,{sort:{updated_time:-1}}, callback);
}
