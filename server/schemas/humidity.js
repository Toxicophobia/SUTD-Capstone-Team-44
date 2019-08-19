var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var humiditySchema = new Schema({
  //_id: Schema.Types.ObjectId,
  updated_time: String,
  lastChangeTime: String,
  zoneIndex: String,
  zoneName: String,
  humidity: String,
  floor: String,
  type: String,
});

var humidityModel = module.exports = mongoose.model('Humidity', humiditySchema, 'humidityEvent');

humidityModel.log = async function(callback) {
  await humidityModel.find({}, callback);
}

humidityModel.latest = async function(callback) {
    await humidityModel.findOne({},null, {sort: {lastChangeTime: -1}}, callback);
  }