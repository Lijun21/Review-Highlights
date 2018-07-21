# Review-Highlights

## Overview
This is a project completed for a challege for Poshmark internship. Implemented a simple positive review highlights algorithm in JavaScript. "The Review Highlights feature was built to help consumers quickly discover the core elements, attractions, menu items, or other popular offerings that a business may be known for. The highlights reflect overall trends we see in the words or phrases that Yelpers use in their reviews of the business, which reduces the consumer's task of reading dozens (or even hundreds) of reviews."

## Tools used
- [Positive Words](http://www.creativeaffirmations.com/positive-words.html) - Words are a reflection of our thoughts. Used to extract positive reviews.
- [npm wordpos](https://www.npmjs.com/package/wordpos) - wordpos is a set of fast part-of-speech (POS) utilities for Node.js using fast lookup in the WordNet database.

## Thought Process
### Create source file
one review per line (i.e., each review is "\n" delimited), comma seperated array of reviews.
For example:
```
$ cat ~/reviews.txt
I Love their falafel sandwiches, go early there is always line at lunchtime during
the week, but it goes pretty quick.,
I've also had the gyros sandwich, which I honestly have only had once. Like I said
previously, the falafel sandwich is just too good. What's different about Falafel
Drive-In's gyros is that the meat is cubed--not sliced. I also like the seasoning
used for the gyros meat.,
Falafel's Drive-In is one popular place--its menu is a cross between Middle
East-inspired street food and American classics (hot dogs and the like).,
The food itself was fine. We ordered one of the specials, a large falafel sandwich
and banana shake, a large side of fries, and then a falafel salad. The falafel itself
really is great and with the red sauce on the side, it is awesome. However, the salad
was just really plain and bland.
```

### read file and create source data
change source file to array of sentences, dot seperated array of strings
(there's still extra space and comma exist, should trim it at the end)

```
[ 'I Love their falafel sandwiches, go early there is always line at lunchtime during the week, but it goes pretty quick',
  ', I\'ve also had the gyros sandwich, which I honestly have only had once',
  ' Like I said previously, the falafel sandwich is just too good',
  ' What\'s different about Falafel Drive-In\'s gyros is that the meat is cubed--not sliced',
  ' I also like the seasoning used for the gyros meat',
  ', Falafel\'s Drive-In is one popular place--its menu is a cross between Middle East-inspired street food and American classics (hot dogs and the like)',
  ', The food itself was fine',
  ' We ordered one of the specials, a large falafel sandwich and banana shake, a large side of fries, and then a falafel salad',
  ' The falafel itself really is great and with the red sauce on the side, it is awesome',
  ' However, the salad was just really plain and bland',
  '' ]
```

### Read source data and get positive reviews 
extract all verb and adj from each sentence. (use node module wordpos)
```
[ 'Love,go,line,go,early,pretty,quick',
  'sandwich,have,only',
  'sandwich,Like,Like,said,just,good',
  'Drive,different,about,sliced',
  'like,like,used',
  'like,Drive,place,cross,Middle,like,one,popular,cross,Middle,East,inspired,American,hot',
  'fine,fine',
  'sandwich,shake,side,then,one,ordered,large,side',
  'side,sauce,side,great,red,on,awesome',
  'plain,just,plain,bland',
  ',' ]
```
dry it cause verb and adj some time 
```
[ [ 'Love', 'early', 'go', 'line', 'pretty', 'quick' ],
  [ 'have', 'only', 'sandwich' ],
  [ 'Like', 'good', 'just', 'said', 'sandwich' ],
  [ 'Drive', 'about', 'different', 'sliced' ],
  [ 'like', 'used' ],
  [ 'American',
    'Drive',
    'East',
    'Middle',
    'cross',
    'hot',
    'inspired',
    'like',
    'one',
    'place',
    'popular' ],
  [ 'fine' ],
  [ 'large', 'one', 'ordered', 'sandwich', 'shake', 'side', 'then' ],
  [ 'awesome', 'great', 'on', 'red', 'sauce', 'side' ],
  [ 'bland', 'just', 'plain' ],
  [ '' ] ]
```
concat with positive word dictionary, sort, and Score each sentence

```
{ '0': 1, '2': 2, '4': 1, '5': 2 }
```
Sorted positive sentences base on positive value
```
[ ' Like I said previously, the falafel sandwich is just too good',
  ', Falafel\'s Drive-In is one popular place--its menu is a cross between Middle East-inspired street food and American classics (hot dogs and the like)',
  'I Love their falafel sandwiches, go early there is always line at lunchtime during the week, but it goes pretty quick',
  ' I also like the seasoning used for the gyros meat' ]
```
(Cons of this algarithm: scored sentence contains words like 'like' doesn't mean verb like...)

### get most mentioned words in positive reviews
use node module wordpos to get all nouns from each positive review sentence, use stopwords option to exclude centain nouns.
```
[ 'Like','Love','at','falafel','falafel','go','good','have','line','lunchtime','quick','sandwich','sandwich','there','week' ]
```
Contat.apply all arrays -> sort the array of nouns -> find which word has been mentioned more than once
(should sore each word and find the most mentioned words)

```
[ 'falafel', 'sandwich', ... ]
```

### print out popular words and positive sentences base on max parameter
Find the sentences that contain positive words and the most mentioned nouns, and pick the first qualify one.
```
$ ./rh ~/reviews.txt 2
falafel 
I Love their falafel sandwiches, go early there is always line at lunchtime during the week, but it goes pretty quick.
```

### Big O
Time complexity is O(nlog(n))
Space complexity is O(log(n))


