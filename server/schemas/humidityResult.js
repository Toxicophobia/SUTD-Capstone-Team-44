var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var humidityResultSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  day_1: Array,
  day_2: Array,
  day_3: Array,
  day_4: Array,
  day_5: Array,
  room_humidity_which_is_lower_than_40_percent:Array,
  room_humidity_which_is_higher_than_65_percent:Array,
  lastChangeTime:String
});

var humidityResultModel = module.exports = mongoose.model('Humidity Results', humidityResultSchema, 'humidityResult');

humidityResultModel.log = async function(callback) {
  await humidityResultModel.find({}, callback);
}

humidityResultModel.latest = async function(callback) {
    await humidityResultModel.findOne({},null, {sort: {lastChangeTime: -1}}, callback);
  }