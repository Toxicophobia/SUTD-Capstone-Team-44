var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var temperatureEventSchema = new Schema({
    roomName: String,
    lastChangeTime: String,
    zoneIndex: String,
    zoneName: String,
    temperatureSetPoint:String,
    floor: String,
    type: String
  });

var temperatureModel = module.exports = mongoose.model('Temperature', temperatureEventSchema, 'temperatureEvent');
