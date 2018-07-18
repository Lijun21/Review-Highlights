const fs = require('fs');
const WordPOS = require('wordpos');
const wordpos = new WordPOS({stopwords: ['I', 'it', 'In', 'a', 's']});
const positiveWords = require('./positive_words');

const file = process.argv[2];
const maxReview = process.argv[3];

//===Read file and Create source data=========================
const sourceData = fs
.readFileSync(file, 'utf8')
.replace(/\r?\n|\r/g, " ")
.split(['.']);

console.log(sourceData);


async function getPositiveReviews () {
    //map each sentence return all verbs 
    let arr_of_verb_adj = await Promise.all(sourceData.map(async (sentence) => {
        let nouns = await wordpos.getVerbs(sentence);
        return (nouns);
    }));
    return Promise.resolve(arr_of_verb_adj);
}

let positiveReviews = [];
let positiveData = [];

getPositiveReviews().then(nouns => {
    console.log(nouns);
    let tmp = []; 
    //concat positive word and source word and sort
    for (let i = 0; i < nouns.length - 1; i++){
        tmp.push(nouns[i].concat(positiveWords).sort());
    }
    // console.log(tmp);
    //loop through sorted array, if same, store in tem
    for (let i = 0; i < tmp.length - 1; i++){
        for (let j = 0; j < tmp[i].length - 1; j++){
            if (tmp[i][j + 1] === tmp[i][j]){
                console.log(tmp[i][j]);
                console.log(i, j);
                positiveReviews.push(i);
                
            }
        }
    }
    console.log(positiveReviews);

    for (let i = 0; i < sourceData.length; i++){
        for (let j = 0; j < positiveReviews.length; j++){
            if (i == j){
                positiveData.push(sourceData[i]);
            }
        }
    }

    console.log(positiveData);

    async function getPopWords () {
        let arr_of_arr_nouns = await Promise.all(positiveData.map(async (sentence) => {
            let nouns = await wordpos.getNouns(sentence)
            // console.log(nouns);
            return nouns;
        }));
        //concat arrays in the array and sort the new array
        return Promise.resolve([].concat.apply([], arr_of_arr_nouns).sort());
    }
    
    let popWords = []; 
    
    //print popular word
    getPopWords().then(nouns => {
        // console.log(nouns);
        for (let i = 0; i < nouns.length - 1; i++){
            if (nouns[i + 1] == nouns[i]){
                popWords.push(nouns[i]);
            }
        }
        console.log(popWords);
    })
})
