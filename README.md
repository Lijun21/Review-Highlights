# Review-Highlights

## Overview
This is a project completed for a challege for Poshmark internship. Implemented a simple positive review highlights algorithm in JavaScript. "The Review Highlights feature was built to help consumers quickly discover the core elements, attractions, menu items, or other popular offerings that a business may be known for. The highlights reflect overall trends we see in the words or phrases that Yelpers use in their reviews of the business, which reduces the consumer's task of reading dozens (or even hundreds) of reviews."

## Tools used
- [350 Positive Words](http://www.creativeaffirmations.com/positive-words.html) - Words are a reflection of our thoughts. Used to extract positive reviews.
- [npm wordpos](https://www.npmjs.com/package/wordpos) - wordpos is a set of fast part-of-speech (POS) utilities for Node.js using fast lookup in the WordNet database.
<!-- - [nexmo api](https://dashboard.nexmo.com/getting-started-guide) -  send message to game loser -->


<!-- ## Diagram
![diagram](res/apiDiagram.png) -->


## Diagram/thought process
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
each sentence -> arry of nouns --> array of arrays
contat all arrays, and sort, then choose the most mentioned one.

falafel,
falafel sandwich,
sandwich
each nouns and nouns scores

### Find the sentences that contain positive words and the most mentioned nouns
I Love their falafel sandwiches, go early there is always line at lunchtime during the week, but it goes pretty quick.
Like I said previously, the falafel sandwich is just too good.
Falafel's Drive-In is one popular place--its menu is a cross between Middle East-inspired street food and American classics (hot dogs and the like).
The falafel itself really is great and with the red sauce on the side, it is awesome.

### pick random sentences above base on requiements
```
$ ./rh ~/reviews.txt 2
falafel sandwich
I Love their falafel sandwiches, go early there is always line at lunchtime during
the week, but it goes pretty quick.
```

## thoughts for Imporvements 
- imporve positive words, the more the better.
- find the most mentions food names or others are ok? like tv or ground opening or sign is fine as well?
- create a auto collect review method.

