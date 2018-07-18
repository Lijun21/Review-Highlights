const fs = require('fs');

const WordPOS = require('wordpos');
const wordpos = new WordPOS();

const file = process.argv[2];
const maxReview = process.argv[3];

//===Read file and Create source data====================
const sourceData = fs
.readFileSync(file, 'utf8')
.replace(/\r?\n|\r/g, "")
.split(['.']);

// console.log(sourceData);

// let arr_nouns = [];

async function get_arr_nouns (sentences){
    const arr = await wordpos.getNouns(sentences);
    // arr_nouns.push(arr);
    return arr;
}

// async function check(){
//     const arr = sourceData.map(eachSentence => get_arr_nouns(eachSentence));
//     console.log(arr);
// }

// // function get_arr_nouns (sentences){
// //     wordpos.getNouns(sentences)
// //     .then(console.log)
// //     .catch(console.error);
// // }

let dataset = Promise.all(sourceData.map(async eachSentence => {
    let arr_nouns = [];
    arr_nouns.push(get_arr_nouns(eachSentence));
    return arr_nouns;
} ))

console.log(dataset);



