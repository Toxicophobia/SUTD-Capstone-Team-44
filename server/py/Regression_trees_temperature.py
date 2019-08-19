import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.metrics import explained_variance_score, \
    mean_absolute_error, \
    median_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from datetime import datetime
from sklearn import tree
from pymongo import MongoClient


def fit_tree(X_train, y_train):
    clf = tree.DecisionTreeRegressor()
    clf.fit(X_train, y_train)
    return clf

class Mongo(object):
    
    def __init__(self):
        self.client = MongoClient('localhost',27017)
        self.db = self.client['Data_Lake']
        
    def get_one(self):
        return self.db.temperatureEvent.find_one()
    
    def get_all(self):
        collection = []
        for d in self.db.temperatureEvent.find({}):
            collection.append(d)
        return collection
    
    def insert_result(self,document):
        if type(document) == dict:
            self.db.temperatureResult.insert_one(document)

        elif type(document) == list:
            self.db.temperatureResult.insert_many(document)

if __name__=='__main__':
    database = Mongo()
    collection = database.get_all()
    df = pd.DataFrame(collection)
    #df = df[df.type != "roomStatusEvent"]
    new_df = df.dropna(subset=['lastChangeTime'], how='any')
    new_df.reset_index(inplace = True)

    time = []
    for i in range(len(new_df)):
        samp = new_df['lastChangeTime'][i]
        time.append(datetime.strptime(samp, '%Y-%m-%dT%H:%M:%SZ'))

    new_df["Time"] = pd.to_datetime(time)
    new_df["Time"] = new_df["Time"].astype(np.int64) //10*9
    #df_temp = new_df[new_df['type'] == "temperatureEvent"]

    #temp_Time = df_temp.groupby("Time", as_index = False).mean()
    #print(temp_Time.columns.tolist)
    X = new_df[['Time', 'floor', 'roomName', 'zoneIndex']]
    y = new_df[["temperatureSetPoint"]]
    xTrain, xTest, yTrain, yTest = train_test_split(X, y, test_size=0.2, shuffle=False)

    model = fit_tree(xTrain, yTrain)
    model = fit_tree(X, y)
    y_pred = model.predict(X)
    current_time = datetime.now()
    current_time_str= current_time.strftime('%Y-%m-%dT%H:%M:%SZ')
    document = {'updated_time':current_time_str,'temperature':y_pred[-1],'MSE':mean_squared_error(y, y_pred)}
    database.insert_result(document)