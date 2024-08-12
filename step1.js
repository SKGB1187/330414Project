/* Step 1: In step1.js,write a function, cat. */
/* It should take one arguments, path, and it should read the file with that path,
and print the contents of that file.*/
/*Then write some code that calls that function, allowing your to specify the
path argument via the command line.*/

const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Error:", err);
            process.kill(1)
        }
        console.log('Path File Data:', data)
    });
};

cat(process.argv[2]);

/* node myprogram.js firstarg secondarg

process.argv[0] == "node"

process.argv[1] == "myprogram.js"

process.argv[2] == "firstarg" */