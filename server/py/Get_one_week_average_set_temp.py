from datetime import datetime
from datetime import timedelta
from pymongo import MongoClient
import statistics

class Mongo(object):

    def __init__(self):
        self.client = MongoClient('localhost',27017)
        self.db = self.client['Data_Lake']

    def get_one_week(self):
        collection = []
        now = datetime.today()
        before = now - timedelta(days=7)
        now = now.strftime('%Y-%m-%dT%H:%M:%SZ')
        before = before.strftime('%Y-%m-%dT%H:%M:%SZ')
        self.lastChangeTime = now
        for d in self.db.temperatureSetPointEvent.find({ 'lastChangeTime': {'$lt': now, '$gte': before}}):
            collection.append(d)
        return collection


    def insert_result(self,document):
        if type(document) == dict:
            self.db.averageSetTemperature.insert_one(document)
        elif type(document) == list:
            self.db.averageSetTemperature.insert_many(document)


def get_avg_temp(lst):
    temp_list = [[] for i in range(24)]
    for d in lst:
        temp_list[int(d['lastChangeTime'].split('T')[1][:2])].append(int(d['temperatureSetPoint']))
    avg = statistics.mean(sum(temp_list, []))
    for i in range(24):
        a = statistics.mean(temp_list[i]) if temp_list[i] else avg
        temp_list[i] = a
    return temp_list

if __name__=='__main__':
    database = Mongo()
    collection = database.get_one_week()
    avg_temp_list = get_avg_temp(collection)
    document = {'avg_temp_list':avg_temp_list,'lastChangeTime':database.lastChangeTime}
    database.insert_result(document)
