var fs = require('fs');

const file = process.argv[2];
const maxReview = process.argv[3];

const souceData = fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    return data.toString();
})

const data = [];

souceData.forEach(element => {
   //work on it after lunch ..... :)
});
