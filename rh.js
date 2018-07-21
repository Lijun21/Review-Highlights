const fs = require('fs');
const WordPOS = require('wordpos');
const wordpos = new WordPOS({stopwords: ['I', 'it', 'In', 'a', 's']});

const getPopWords = require('./getPopWords');
const getPositiveSentence = require('./getPositiveSentence');

//print out positive popular words and positive reviews base on max print number
getPositiveReviews().then(result => {
    console.log(result)
    
    const maxPrint = process.argv[3];
    const printWord = Math.round(maxPrint / 2);
    const printSentence = maxPrint - printWord;

    if (printWord <= result[1].length){
        for (let i = 0; i < printWord; i++){
            console.log(result[1][i][0]);
        }
    }else{
        result[1].forEach(each => console.log(each[0]));
    }

    if (printSentence <= result[0].length){
        for (let i = 0; i < printSentence; i++){
            console.log(result[0][i]);
        }
    }else{
        result[0].forEach(each => console.log(each[i]));
    }
}).catch(err => {
    console.error(err);
})


//===Read source data and get positive reviews ==================================
async function getPositiveReviews () {
    const file = process.argv[2];
    if (!file) throw new Error('Please add review file path parameter :)');
    //read file and create array of sentences
    const sentences = fs.readFileSync(file, 'utf8').replace(/\r?\n|\r/g, " ").split(['.']);
    
    //map through each sentence return all verbs and adj as mainWords
    const mainWords = await Promise.all(sentences.map(async (sentence) => {
        try {
            let nouns = await wordpos.getVerbs(sentence);
            let adjs = await wordpos.getAdjectives(sentence);
            return (nouns + ',' + adjs);
        }catch(err){
            throw new Error(`error when extract nouns and adjs from sentences: ${err}`);
        }
    }));

    positiveSentence = getPositiveSentence(mainWords, sentences);

    try {
        const popWords = await getPopWords(positiveSentence);
        return Promise.resolve([positiveSentence, popWords]);
    }catch(err){
        throw new Error(err);
    }
}
