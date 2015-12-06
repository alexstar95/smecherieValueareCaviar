import urllib2, json
from sklearn import linear_model
from datetime import datetime
import zerorpc 

#FEATURES THAT WE MIGHT USE

#rfcid
#model
#mileage
#first
#passed in 2003?
#first fuckup ???
#number of fuckups ???

def days_till(d1, d2):
    d1 = datetime.strptime(d1, "%Y-%m-%d")
    d2 = datetime.strptime(d2, "%Y-%m-%d")
    return abs((d2 - d1).days)

class ProbabilityCreator(object):
	def getProbability(): #some parameters, we will se which ones
		readFile = urllib2.urlopen("http://elastic-motdata-1240169001.eu-west-1.elb.amazonaws.com/motdata/testresult/_search?pretty&size=1000").read()
		json = json.loads(readFile) 

		dataSet = json['hits']['hits']
		sourcesArray = []
		featuresArray = []
		targetsArray = []

		for entryPoint in dataSet:
			sourcesArray.append(entryPoint['_source'])

		for value in sourcesArray:
			threeFeatures = []
			#threeFeatures.append(value['cylinder_capacity'])
			#threeFeatures.append(value['test_mileage'])

			#creating the date feature
			startDate = value['first_use_date']
			testDate = value['test_date']
			theDifference = days_till(startDate, testDate)

			#add it into the feature array
			threeFeatures.append(theDifference)

			if(value['test_result'] == "P"):
				targetsArray.append(1.)
			else:
				targetsArray.append(0.)

			#append this set of features to the training set
			featuresArray.append(threeFeatures)


			clf = linear_model.BayesianRidge()
			X = featuresArray
			Y = targetsArray
			clf.fit(X,Y)
			result = clf.predict([[4500]])

			return result

rpcControl = zerorpc.Server(ProbabilityCreator())
rpcControl.bind("tcp://0.0.0.0:4242")
print "This is running on port 4242 ...."
rpcControl.run()

			