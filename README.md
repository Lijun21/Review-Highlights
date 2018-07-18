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

```
I Love their falafel sandwiches, go early there is always line at lunchtime during the week, but it goes pretty quick.
I've also had the gyros sandwich, which I honestly have only had once.
Like I said previously, the falafel sandwich is just too good.
What's different about Falafel Drive-In's gyros is that the meat is cubed--not sliced.
I also like the seasoning used for the gyros meat.
Falafel's Drive-In is one popular place--its menu is a cross between Middle East-inspired street food and American classics (hot dogs and the like).
The food itself was fine.
We ordered one of the specials, a large falafel sandwich and banana shake, a large side of fries, and then a falafel salad.
The falafel itself really is great and with the red sauce on the side, it is awesome.
However, the salad was just really plain and bland.
```

### Read source data and Find the most mentioned nouns 
use node module wordpos getNouns method to get all nouns from each sentence, use stopwords option to exclude centain nouns.
contat all arrays -> get arry of nouns -> sort the array of nouns -> find which word has been mentioned the most

```
[ 'falafel', 'sandwich', ... ]
```

### Find the sentences index that contain positive words
```
[ 0, 0, 1, 1, 2, ... ]
```

### pick random sentences qualify
Find the sentences that contain positive words and the most mentioned nouns, and pick the first qualify one.
```
$ ./rh ~/reviews.txt 2
falafel 
I Love their falafel sandwiches, go early there is always line at lunchtime during the week, but it goes pretty quick.
```

### Big O
Time complexity is O(nlog(n))
Space complexity is O(log(n))

