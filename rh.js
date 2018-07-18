const fs = require('fs');
const WordPOS = require('wordpos');
const wordpos = new WordPOS({stopwords: ['I', 'it', 'In', 'a', 's']});
const positiveWords = require('./positive_words');

const file = process.argv[2];
const maxPrint = process.argv[3];

if (!file){
    console.log('Please add review file path parameter :)');
    return ;
}

//===Read file and Create source data===========================================
const sourceData = fs
.readFileSync(file, 'utf8')
.replace(/\r?\n|\r/g, " ")
.split(['.']);

// console.log(sourceData);

//===Read source data and get positive reviews ==================================
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
    // console.log(nouns);
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
                positiveReviews.push(i);
            }
        }
    }
    // console.log(positiveReviews);

    for (let i = 0; i < sourceData.length; i++){
        for (let j = 0; j < positiveReviews.length; j++){
            if (i == j){
                positiveData.push(sourceData[i]);
            }
        }
    }

    // console.log(positiveData);

    //====get most mentioned words in positive reviews==================================
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
    
    getPopWords().then(nouns => {
        // console.log(nouns);
        //find the words that show up more then once
        for (let i = 0; i < nouns.length - 1; i++){
            if (nouns[i + 1] == nouns[i]){
                popWords.push(nouns[i]);
            }
        }

        //to print popular word half the the max amount
        let printWord = Math.round(maxPrint / 2);
        if (printWord <= popWords.length){
            for (let i = 0; i < printWord; i++){
                console.log(popWords[i]);
            }
        }else{
            popWords.forEach(each => console.log(each));
        }

        //to print positive sentence, half of the max amount
        let printSentence = maxPrint - Math.round(maxPrint / 2);
        if (printSentence <= positiveData.length){
            for (let i = 0; i < printSentence; i++){
                console.log(positiveData[i]);
            }
        }else{
            positiveData.forEach(each => console.log(each));
        }
    })
})
