const fs = require('fs');
const WordPOS = require('wordpos');
const wordpos = new WordPOS({stopwords: ['I', 'it', 'In', 'a']});
const positiveWords = require('./positive_words');

const file = process.argv[2];
const maxReview = process.argv[3];

//===Read file and Create source data=========================
const sourceData = fs
.readFileSync(file, 'utf8')
.replace(/\r?\n|\r/g, "")
.split(['.']);

//get one sentence 
//get all the nouns from one sentence
//contact the nouns to array, sort
//get another sentence 
//repeat
async function getPopWords () {
    let arr_of_arr_nouns = await Promise.all(sourceData.map(async (sentence) => {
        let nouns = await wordpos.getNouns(sentence)
        return nouns;
        
    }));
    //concat arrays in the array and sort the new array
    return Promise.resolve([].concat.apply([], arr_of_arr_nouns).sort());
}

let popWords = []; 

//print popular word
getPopWords().then(nouns => {
    for (let i = 0; i < nouns.length; i++){
        if (nouns[i + 1] == nouns[i]){
            popWords.push(nouns[i]);
        }
    }
    console.log(popWords[0]);
})



function getPositiveReviews (positiveWords){
    let data = sourceData;
    let tmp_data = [];
    let positiveReviews = [];
    //concat review words and target positive words and then sort
    for (let i = 0; i < data.length; i++){
        tmp_data[i] = data[i].replace(/[,\/]/g, "").split(' ').concat(positiveWords).sort();
    }
    //loop through array to see if target positive words exits in sentences
    for (let i = 0; i < tmp_data.length; i++){
        for (let j = 0; j < tmp_data[i].length; j++){
            if (tmp_data[i][j + 1] == tmp_data[i][j]){
                positiveReviews.push(i);
            }
        }
    }
    return positiveReviews;
}

positiveReviews = getPositiveReviews(positiveWords);

//print positive and contain popular word sentences
//...



