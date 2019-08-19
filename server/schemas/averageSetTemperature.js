var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var averageSetTemperatureSchema = new Schema({
  //_id: Schema.Types.ObjectId, // or mongoose.Types.ObjectId
  avg_temp_list: Array,
  lastChangeTime:String
});

var averageSetTemperatureModel = module.exports = mongoose.model('Average Set Temps', averageSetTemperatureSchema, 'averageSetTemperature');

averageSetTemperatureModel.log = async function(callback) {
  await averageSetTemperatureModel.find({}, callback);
}

averageSetTemperatureModel.latest = async function(callback) {
  await averageSetTemperatureModel.findOne({},null, {sort: {lastChangeTime: -1}}, callback);
}