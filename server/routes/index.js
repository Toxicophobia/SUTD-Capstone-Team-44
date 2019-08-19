var express = require('express');
var router = express.Router();
var temperatureResult = require('../schemas/temperatureResult.js')
var humidityResult = require('../schemas/humidityResult.js')
var averageSetTemperature = require('../schemas/averageSetTemperature.js')
var humidity = require('../schemas/humidity.js')
var laundryPickUpResultModel = require('../schemas/laundryPickUpResult.js')
var humidityEventModel = require('../schemas/humidity.js');
var temperatureEventModel = require('../schemas/temperatureEvent.js');
var temperatureSetPointEventModel = require('../schemas/temperatureSetPointEvent.js');
var textSummaryModel   = require('../schemas/textSummary.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;

router.get('/test', function (req, res) {
    temperatureResult.latest(function (err, i) {
        res.send(i);
    });
});

router.get('/test2', function (req, res) {
    humidityResult.latest(function (err, i) {
        res.send(i);
    });
});

router.get('/test3', function (req, res) {
    averageSetTemperature.latest(function (err, i) {
        res.send(i);
    });
});

router.get('/test4', function (req, res) {
    humidity.latest(function (err, i) {
        res.send(i);
    });
});


router.post(
    '/genReport',
    function (req, res) {

        if (req.body['time_period'] == 'True'){
          var time_period_sel = req.body['time_period_sel']
          var fromToPeriod = null
        }else {
          var time_period_sel = null
          var fromToPeriod = [req.body['from'], req.body['to']]
        }

        if (req.body['floors_sel'] == ''){
          var floors_sel = null
        }else {
          var floors_sel = req.body['floors_sel']
        }

        if (req.body['rooms_sel'] == ''){
          var rooms_sel = null
        }else {
          var rooms_sel = req.body['rooms_sel']
        }

        var userInput = req.body['type']
        var dictionary = {'floor':floors_sel, 'room':rooms_sel, 'lastPeriod': time_period_sel, 'fromToPeriod': fromToPeriod}


        if (userInput == 'Temperature Set Point') {
            temperatureSetPointEventModel.find(generateQueryCommand(dictionary)).exec(function (err, result) {
                if (!err) {
                   var textSummarytexts = showText(userInput, dictionary, result)
                   var lastChangeTime = new Date().toISOString();
                   var documents = {'textSummary':textSummarytexts, 'lastChangeTime':lastChangeTime}
                   var textSummary = new textSummaryModel(documents);
                   textSummary.save(function(err){
                     if (err) console.log(err);
                   })
                  } else {
                    console.log('no existed data')
                }
            });
        } else if (userInput == 'Temperature') {
            temperatureEventModel.find(generateQueryCommand(dictionary)).exec(function (err, result) {
                if (!err) {
                  var textSummarytexts = showText(userInput, dictionary, result)
                  var lastChangeTime = new Date().toISOString();
                  var documents = {'textSummary':textSummarytexts, 'lastChangeTime':lastChangeTime}
                  var textSummary = new textSummaryModel(documents);
                  textSummary.save(function(err){
                    if (err) console.log(err);
                  })
                } else {
                    console.log('no existed data')
                }
            });
        } else if (userInput == 'Humidity') {
            humidityEventModel.find(generateQueryCommand(dictionary)).exec(function (err, result) {
                if (!err) {
                  var textSummarytexts = showText(userInput, dictionary, result)
                  var lastChangeTime = new Date().toISOString();
                  var documents = {'textSummary':textSummarytexts, 'lastChangeTime':lastChangeTime}
                  var textSummary = new textSummaryModel(documents);
                  textSummary.save(function(err){
                    if (err) console.log(err);
                  })
                } else {
                    console.log('no existed data')
                }
            });
        } else { console.log('no existed data'); }


    }
);


router.get('/test5', function (req, res) {
    laundryPickUpResultModel.latest(function (err, i) {
        res.send(i);
    });
});




function showText(userInput, dictionary, result) {
    var dic = {
        'Temperature Set Point': 'temperatureSetPoint',
        'Temperature': 'temperatureSetPoint',
        'Humidity': 'humidity'
    }
    var arr = []
    for (var i = 0; i < result.length; i++) {
        arr.push(Number(result[i][dic[userInput]]));
    }
    let average = (array) => array.reduce((a, b) => a + b) / array.length;
    let standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)))

    min = Math.min.apply(null, arr);
    max = Math.max.apply(null, arr);
    mean = average(arr);
    std = standardDeviation(arr);

    room = (dictionary['room'] == null) ? '' : ' in room ' + dictionary['room'];
    floor = (dictionary['floor'] == null) ? '' : ' in floor ' + dictionary['floor'];

    if (dictionary['fromToPeriod'] == null){
          textSummary = 'The ' + userInput.toLowerCase() + room + floor +
          ' between date ' + getDate(dictionary['lastPeriod'])[0] + ' and ' + getDate(dictionary['lastPeriod'])[1] +
          ' is between ' + String(min) + ' and ' + String(max) + ', with average of ' + String(Math.round(mean * 100) / 100) + ' and standard deviation of ' + String(Math.round(std * 100) / 100)
    } else{
      textSummary = 'The ' + userInput.toLowerCase() + room + floor +
      ' between date ' + dictionary['fromToPeriod'][0] + ' and ' + dictionary['fromToPeriod'][1] +
      ' is between ' + String(min) + ' and ' + String(max) + ', with average of ' + String(Math.round(mean * 100) / 100) + ' and standard deviation of ' + String(Math.round(std * 100) / 100)
    }

    return textSummary
}

function getDate(lastPeriod) {
    let today = new Date().toISOString().slice(0, 10);
    let before = new Date();
    before.setDate(before.getDate() - Number(lastPeriod));
    return [String(before.toISOString().slice(0, 10)), String(today)]; //
}


function generateQueryCommand(dict) {
    queryCommand = {};
    if (dict['floor'] != null) {
        queryCommand["floor"] = dict['floor'];
    }
    if (dict['room'] != null) {
        queryCommand["roomName"] = dict['room'];
    }
    if (dict['lastPeriod'] != null) {
        [date1, date2] = getDate(dict['lastPeriod'])
        queryCommand["lastChangeTime"] = { $gt: date1, $lt: date2 };
    }
    if (dict['fromToPeriod'] != null) {
        [date1, date2] = [dict['fromToPeriod'][0],dict['fromToPeriod'][1]]
        queryCommand["lastChangeTime"] = { $gt: date1, $lt: date2 };
    }
    return queryCommand
}

function exportCSV(userInput, result) {
    var dic = {
        'Temperature Set Point': ['type', 'roomName', 'Floor', 'lastChangeTime', 'zoneIndex', 'zoneName', 'temperatureSetPoint'],
        'Temperature': ['roomName', 'lastChangeTime', 'zoneIndex', 'zoneName', 'temperatureSetPoint', 'floor', 'type'],
        'Humidity': ['roomName', 'lastChangeTime', 'zoneIndex', 'zoneName', 'Humidity', 'floor', 'type']
    }

    const { Parser } = require('json2csv');

    const fields = dic[userInput];
    const opts = { fields };

    try {
        const parser = new Parser(opts);
        const csv = parser.parse(result);
        console.log(csv); as
    } catch (err) {
        console.error(err);
    }
}
