from sklearn import linear_model
from sklearn import cross_validation
import numpy as np
import json

MERGED_JSON = "../data/final_datamining_ted.json"
ATTR_LIST_ITRATION = [["FB_like_count"],
                      ["FB_like_count", "FB_share_count"],
                      ["FB_like_count", "FB_share_count", "twitter_count"],
                      ["FB_like_count", "FB_share_count", "twitter_count", "FB_comment_count"],
                      ["FB_like_count", "FB_share_count", "twitter_count", "FB_comment_count", "duration"],
                      ["FB_like_count", "FB_share_count", "twitter_count", "FB_comment_count", "duration", "category"],
                     ]

TARGET_ATTR = "viewCount"

def train_n_validate(attr_list):
    # make train_data, train_target, test_data, test_result
    dataset = []
    targetset = []
    for video_data in all_videos:
        if video_data[TARGET_ATTR] == "":
            continue
        video_attr = []
        for attr in attr_list:
            if video_data[attr] == "":
                break
            video_attr.append(int(video_data[attr]))
        if len(video_attr) < len(attr_list):
            continue

        dataset.append(video_attr)
        targetset.append(int(video_data[TARGET_ATTR]))

    # have to convert array to numpy array
    dataset = np.array(dataset)
    targetset = np.array(targetset)

    #print dataset[0]
    #print len(dataset)
    #print len(targetset)

    regr = linear_model.LinearRegression()
#    regr = linear_model.Ridge(alpha=.1)

    train_data, test_data, train_target, test_target = cross_validation.train_test_split(dataset, targetset, test_size=0.1, random_state=1)
    regr.fit(train_data, train_target)
    print regr.coef_
    score = regr.score(test_data, test_target)
    print score
#    r = regr.predict(test_data)
#    print r

'''
    # cross_validation
    scores = cross_validation.cross_val_score(regr, dataset, targetset, cv=2)
    print scores
    print "Accuracy: %0.2f (+/- %0.2f)" % (scores.mean(), scores.std() / 2)
'''


###### Main

'''
from sklearn import datasets
diabetes = datasets.load_diabetes()
diabetes_X_train = diabetes.data[:-20]
diabetes_X_test  = diabetes.data[-20:]
diabetes_y_train = diabetes.target[:-20]
diabetes_y_test  = diabetes.target[-20:]
'''

# load json files to 'all_videos'
all_videos = []
with open(MERGED_JSON, "r") as merged_json_file:
    for line in merged_json_file:
        video_data = json.loads(line)
        all_videos.append(video_data)
# print len(all_videos)

# converting category into number
cat_dict = {}
cat_cnt = 0
for i in range(0, len(all_videos)):
    cat = all_videos[i]['category']
    if cat == "":
        continue
    if cat not in cat_dict:
        cat_cnt += 1
        cat_dict[cat] = cat_cnt
    all_videos[i]['category'] = cat_dict[cat]
#print(all_videos[100])
#print(cat_dict)

i = 1
for attr_list in ATTR_LIST_ITRATION:
    print "iteration %d:" % (i),
    for attr in attr_list:
        print "%s" % attr,
    print
    train_n_validate(attr_list)
    i += 1
