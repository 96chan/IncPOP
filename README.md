IncPOP
================
Team Members 
================

Chan Kim(chan@ischool.berkeley.edu), JT Huang(jthuang@ischool.berkeley.edu)

Our Goal
================
TED is a nonprofit devoted to Ideas Worth Spreading. It started out (in 1984) as a conference bringing together people from three worlds: Technology, Entertainment, and Design. The TED Open Translation Project brings TED Talks beyond the English-speaking world by offering subtitles, interactive transcripts and the ability for any talk to be translated by volunteers worldwide. The project was launched with 300 translations, 40 languages and 200 volunteer translators; now, there are more than 32,000 completed translations from the thousands-strong community. The TEDx program is designed to give communities the opportunity to stimulate dialogue through TED-like experiences at the local level.

Our porject tries to find out what factors will drive the viewership of the TED and TEDx YouTube videos.

Motivation
================
* These TED and TEDx Talk videos are worth spread into different languages, not only their own native languages, so we want to build some tools to encourage translators to join the translation project.
* First we try to build a recommendation tool to recommend the potential popular videos for the translator to translate.
* Moreover, we are also curious about how the social media will help to promote the viewership of the videos.

Dataset
================
* YouTube data (28,952 videos) from 'tedxtalks’ (27,581 videos) and 'TEDtalksDirector' (1,371 videos) using YouTube API
* Facebook graph data and Twitter data from each service’s API according to YouTube link urls

Running Programs
================
* code/merger.py - merge the dataset from YouTube API ('data/datamining_sample.txt') and from TEDx website ('data/final_tedx.json'), get social media attributes of those attributes from Facebook and Twitter, and finally generate the final result JSON file 'data/final_datamining_ted.json'
* code/mining.py - use linear regression supervised learning to mine the data 'data/final_datamining_ted.json' with various attribute combinations and output the accuracy results.
