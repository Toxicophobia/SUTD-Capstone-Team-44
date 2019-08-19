var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var textSummarySchema = new Schema({
  //_id: Schema.Types.ObjectId, // or mongoose.Types.ObjectId
  textSummary: String,
  lastChangeTime: String,
});

var textSummaryModel = module.exports = mongoose.model('Text Summary', textSummarySchema, 'textSummary');

textSummaryModel.save = async function(callback,i) {
  await textSummaryModel.create(i, callback);
}
