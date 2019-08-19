// period : int
// floor: int
// Parameters: temperature, Humidity, temperatureSetPoint






var humidityEventModel = require('../schemas/humidity');
var temperatureEventModel = require('../schemas/temperatureEvent');
var temperatureSetPointEventModel = require('../schemas/temperatureSetPointEvent');



//Coming from frontend
var userInput = 'Temperature Set Point';
var dictionary = {'floor':'8','room':null,'lastPeriod':100} //The floor must be in string
//Coming from frontend


//{"floor":floor,"roomName":room, "lastChangeTime": {}}



if (userInput == 'Temperature Set Point'){
  temperatureSetPointEventModel.find(generateQueryCommand(dictionary)).exec(function(err, result){
      if (!err) {
          console.log('----------------------------------Text Summary----------------------------------');
          console.log(showText(userInput, dictionary, result));
          console.log('----------------------------------Text Summary----------------------------------');
      }else{
          console.log('no existed data')
      }
  });
}else if (userInput == 'Temperature') {
  temperatureEventModel.find(generateQueryCommand(dictionary)).exec(function(err, result){
      if (!err) {
          console.log('----------------------------------Text Summary----------------------------------');
          console.log(showText(userInput, dictionary, result));
          console.log('----------------------------------Text Summary----------------------------------');
      }else{
          console.log('no existed data')
      }
  });
}else if (userInput == 'Humidity') {
  humidityEventModel.find(generateQueryCommand(dictionary)).exec(function(err, result){
      if (!err) {
          console.log('----------------------------------Text Summary----------------------------------');
          console.log(showText(userInput, dictionary, result));
          console.log('----------------------------------Text Summary----------------------------------');
      }else{
          console.log('no existed data')
      }
  });
}else {console.console.log('no existed data');}
function showText(userInput, dictionary, result){
    var dic = {'Temperature Set Point': 'temperatureSetPoint',
                'Temperature':'temperatureSetPoint',
                'Humidity':'Humidity'
              }
    var arr = []
    for (var i = 0; i< result.length; i++) {
      arr.push(Number(result[i][dic[userInput]]));
    }
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    let standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)))
  
    min = Math.min.apply(null, arr);
    max = Math.max.apply(null, arr);
    mean = average(arr);
    std = standardDeviation(arr);
  
    room = (dictionary['room']== null)? '':' in room '+dictionary['room'];
    floor = (dictionary['floor']== null)? '':' in floor '+ dictionary['floor'];
  
    textSummary = 'The '+ userInput.toLowerCase() + room + floor+
                ' between date '+ getDate(dictionary['lastPeriod'])[0] + ' and ' + getDate(dictionary['lastPeriod'])[1] +
                ' is between '+ String(min)+ ' and '+ String(max) + ', with average of '+ String(Math.round(mean * 100) / 100)+ ' and standard deviation of '+ String(Math.round(std * 100) / 100)
  
    return textSummary
  }
  
function getDate(lastPeriod) {
    let today = new Date().toISOString().slice(0, 10);
    let before = new Date();
    before.setDate(before.getDate()-Number(lastPeriod));
    return [String(before.toISOString().slice(0, 10)), String(today)];
  }
  
  function generateQueryCommand(dict){
    queryCommand = {};
    if (dict['floor'] != null){
      queryCommand["floor"] = dict['floor'];
    }
    if (dict['room'] != null){
      queryCommand["roomName"] = dict['room'];
    }
    if (dict['lastPeriod'] != null){
      [date1, date2] = getDate(dict['lastPeriod'])
      queryCommand["lastChangeTime"] = {$gt: date1, $lt: date2};
    }
    return queryCommand
  }
  
function exportCSV(userInput, result){
  var dic = {'Temperature Set Point': ['type', 'roomName', 'Floor', 'lastChangeTime', 'zoneIndex', 'zoneName', 'temperatureSetPoint'],
              'Temperature': ['roomName', 'lastChangeTime', 'zoneIndex', 'zoneName', 'temperatureSetPoint', 'floor', 'type'],
              'Humidity': ['roomName', 'lastChangeTime', 'zoneIndex', 'zoneName', 'Humidity', 'floor', 'type']
            }

  const { Parser } = require('json2csv');

  const fields = dic[userInput];
  const opts = { fields };

  try {
    const parser = new Parser(opts);
    const csv = parser.parse(result);
    console.log(csv);as
    } catch (err) {
        console.error(err);
    }
}



/*
averageSetTemperatureModel.log = async function(callback) {
  await averageSetTemperatureModel.find({}, callback);
}

averageSetTemperatureModel.latest = async function(callback) {
  await averageSetTemperatureModel.findOne({},null, {sort: {lastChangeTime: -1}}, callback);
}
*/
