from datetime import datetime
from datetime import timedelta
from pymongo import MongoClient
import statistics
import pdb

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
        for d in self.db.laundryPickUpEvent.find({ 'lastChangeTime': {'$lt': now, '$gte': before}}):
            collection.append(d)
        return collection


    def insert_result(self,document):
        if type(document) == dict:
            self.db.laundryPickUpResult.insert_one(document)
        elif type(document) == list:
            self.db.laundryPickUpResult.insert_many(document)

#[{'_id':..., 'type':...,'roomName':...,'lastChangeTime':...,'zoneIndex':...,'zoneName':...,'laundryPickUp':...,'floor':...},...]

# _id:5d459b042aee6b06e391cb47
# type:"laundryRequestEvent"
# roomName:"750"
# Floor:"7"
# lastChangeTime:"2018-08-27T04:23:42Z"
# zoneIndex:"1"
# zoneName:"Living"
# laundryPickUp:"false"

#2019-06-15T12:10:57Z
def get_avg_service_time(lst):
    request_list = [0 for i in range(24)]
    status_dict = {}
    tot_time, count = 0, 0
    datetimeFormat = '%H:%M:%S'
    for d in lst:
        time, room, req = d['lastChangeTime'].split('T')[1][:-1], d['roomName'], d['laundryPickUp']
        hour = time.split(':')[0]
        request_list[int(hour)]+= 1
        if room not in status_dict:
            status_dict[room] = []
        status_dict[room].append((time, req))
    #status_dict = sorted(status_dict.items(), key = lambda kv: kv[1][0])
    for k, lst in status_dict.items():
        lst = sorted(lst)
        if lst[0][1] == 'false': #remove it
            lst = lst[1:]
        if lst[-1][1] == 'true':
            lst = lst[:-1]
        for i in range(0, len(lst)//2 - 1):
            date1, date2 = lst[2*i][0], lst[2*i+1][0]
            tot_time+= (datetime.strptime(date2, datetimeFormat)\
                        - datetime.strptime(date1, datetimeFormat)).seconds
            count+= 1

    return request_list, sum(request_list), tot_time*1.0/count/60


if __name__=='__main__':
    database = Mongo()
    collection = database.get_one_week()
    avg_request_list, avg_request_per_day, avg_request_time = get_avg_service_time(collection)
    document = {'avg_request_list':avg_request_list,'avg_request_per_day':avg_request_per_day,'avg_wait_time':avg_request_time,'lastChangeTime':database.lastChangeTime}
    database.insert_result(document)
