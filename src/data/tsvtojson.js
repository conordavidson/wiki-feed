fs = require('fs')
fs.readFile('./wikilanguages.tsv', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  parseData(data);
});

function parseData(data){
  splitData = data.split("\n")
  let dataObj = {}
  splitData.map(line => {

    let lineArr = line.split("\t")
    let language = lineArr[1]
    let prefix = lineArr[3]

    dataObj[prefix] = language
  });
  writeFile(dataObj)
}

function writeFile(data){
  fs.writeFile("./wikilanguages.json", JSON.stringify(data), err => {
      if(err) {
          return console.log(err);
      }
      console.log("wikilanguages.json has been saved.");
  });
}
