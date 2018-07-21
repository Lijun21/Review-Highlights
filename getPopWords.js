const WordPOS = require('wordpos');
const wordpos = new WordPOS({stopwords: ['I', 'it', 'In', 'a' ,'s','one', 'like']});

//====get most mentioned words in positive reviews==================================
module.exports = async function getPopWords (positiveSentence) {
    let double_arr_nouns = await Promise.all(positiveSentence.map(async (sentence) => {
        try {
            let nouns = await wordpos.getNouns(sentence)
            return nouns;
        }catch(err){
            throw new Error(`rejected in func getPopWords ${err}`)
        }
    }));
    //concat arrays in the array and sort the new array
    const popWords = [].concat.apply([], double_arr_nouns).sort();
    // console.log(popWords);
    sorted_popWord = popWords.map(each => each.toLowerCase()).sort();

    //to count pop words amount in each sentence
    const popCount = {};
    for (let i = 0; i < sorted_popWord.length; i++){
        if (sorted_popWord[i + 1] == sorted_popWord[i]){
            popCount[sorted_popWord[i]] = (popCount[sorted_popWord[i]] || 0) + 1;
        }
    }

    const popWordArray = [];
    for (prop in popCount){
        popWordArray.push([prop, popCount[prop]]);
    }
    popWordArray.sort((a, b) => b[1] - a[1]);
    return Promise.resolve(popWordArray);
}
