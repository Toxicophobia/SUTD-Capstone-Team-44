from datetime import datetime
from pymongo import MongoClient
from datetime import timedelta
import statistics

class Mongo(object):

    def __init__(self):
        self.client = MongoClient('localhost',27017)
        self.db = self.client['Data_Lake']

    def get_one_week(self):
        collection = []
        now = datetime.today()
        before = now - timedelta(days=4)
        now = now.strftime('%Y-%m-%dT%H:%M:%SZ')
        before = before.strftime('%Y-%m-%dT%H:%M:%SZ')
        for d in self.db.humidityEvent.find({ 'lastChangeTime': {'$lt': now, '$gte': before}}):
            collection.append(d)
        self.lastChangeTime = now
        return collection

    def insert_result(self,document):
        if type(document) == dict:
            self.db.humidityResult.insert_one(document)
        elif type(document) == list:
            self.db.humidityResult.insert_many(document)


def get_avg_humidity(lst):
    all_days = sorted(list(set([d['lastChangeTime'].split('T')[0] for d in lst])))
    last_day = all_days[-1]
    h, humid_dict = {'room_humidity_which_is_lower_than_40_percent':[],
                  'room_humidity_which_is_higher_than_65_percent': []}, dict.fromkeys(['day_'+ str(s+1) for s in range(len(all_days))])
    for d in lst:
        date, humidity, room = d['lastChangeTime'].split('T')[0], float(d['humidity']), d['roomName']
        date_key = 'day_'+ str(all_days.index(date)+1)
        if humid_dict[date_key] is None:
            humid_dict[date_key] = []
        humid_dict[date_key].append(humidity)
        if date == last_day and humidity<40:
            h['room_humidity_which_is_lower_than_40_percent'].append(room)
        elif date == last_day and humidity>65:
            h['room_humidity_which_is_higher_than_65_percent'].append(room)
    #for k, v in humid_dict.items():
    #    std = statistics.stdev(v) if len(v)>1 else 0
    #    humid_dict[k] = [min(v), max(v), statistics.mean(v), std]
    #humid_dict.update(h)
    return humid_dict


if __name__=='__main__':
    database = Mongo()
    collection = database.get_one_week()
    documents = get_avg_humidity(collection)
    documents['lastChangeTime'] = database.lastChangeTime
    database.insert_result(documents)
