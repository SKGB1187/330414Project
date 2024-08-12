/* Copy over your ***step2.js*** code to ***step3.js***.

Add a feature where, on the command line, you can *optionally* provide an 
argument to output to a file instead of printing to the console. The argument 
should look like this: `--out output-filename.txt readfile-or-url`.

Current features should still work the same: 

However, if --out follows your script name, it should take the next argument 
and use that as the path to write to.

Make sure you handle errors trying to write to the file:

If so, you probably have a lot of duplicated code among these functions. Try to 
structure your code so that:

- your functions are small, could be tested, and do one thing
- you minimize duplication of code throughout*/

const fs = require('fs');
const process = require('process');
const axios = require('axios');

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, 'utf8', function(err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, out);
    }
  });
}

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    handleOutput(resp.data, out);
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}