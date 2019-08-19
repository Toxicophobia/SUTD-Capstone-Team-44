var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var temperatureSetPointEventSchema = new Schema({
    type: String,
    roomName: String,
    floor: String,
    lastChangeTime: String,
    zoneIndex: String,
    zoneName: String,
    temperatureSetPoint:String
  });

  var temperatureSetPointEventModel = module.exports =  mongoose.model('TemperatureSetPoint', temperatureSetPointEventSchema, 'temperatureSetPointEvent');

  
