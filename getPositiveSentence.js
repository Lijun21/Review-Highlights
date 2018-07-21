const positiveWords = require('./pos_word_dictionary');

//concat dry mainWords with positive word dictionary, and sort, then sore each sentence
module.exports = function getPositiveSentence(mainWords, sentences){
    //to remove the doubles in mainWords, cause verb can be adj some time
    const dryMainword = dryNounsAdjs(mainWords);
    console.log(dryMainword);
    let helper = [];
    for (let i = 0; i < dryMainword.length; i++){
        helper.push(dryMainword[i].concat(positiveWords).sort());
    }
    // sorce sentences base on count result of how many doubles in an given array
    let positive_score = {};
    for (let i = 0; i < helper.length; i++){
        for (let j = 0; j < helper[i].length - 1; j++){
            if (helper[i][j + 1].toLowerCase() === helper[i][j].toLowerCase()){
                positive_score[i] = (positive_score[i] || 0) + 1;
            }
        }
    }
    const arr = [];
    for (prop in positive_score){
        arr.push([prop, positive_score[prop]]);
    }
    arr.sort((a, b) => b[1] - a[1]);
    let positiveSentence = [];
    arr.forEach(each => {
        positiveSentence.push(sentences[each[0]]);
    })
    return positiveSentence;
}



function dryNounsAdjs(mainWords){
    let result = [];
    for (let i = 0; i < mainWords.length; i++){
        result[i] = mainWords[i].split(',').sort();
    }
    //remove duplicate values from each array, max same values is two
    for (let i = 0; i < result.length; i++){
        for (let j = 0; j < result[i].length - 1; j++){
            if (result[i][j + 1] == result[i][j]){
                result[i].splice(j, 1);
            }
        }
    }
    return result;
}
