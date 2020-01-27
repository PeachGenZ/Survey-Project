const express = require('express')
const cors = require('cors')
const app = express()
var R = require("r-script");

app.use(cors())

app.get('/api', (req, res) => {
  res.json({
    message: 'Test Node.js',
    choices: [{
      value: 1,
      text: 'น้อย',
      select: 5,
    }, {
      value: 2,
      text: 'ปานกลาง',
      select: 2,
    }, {
      value: 3,
      text: 'มาก',
      select: 2,
    }, {
      value: 4,
      text: 'มากที่สุด',
      select: 2,
    }]
  })
}) 
/*var attitude = JSON.parse(
  require("fs").readFileSync("example/attitude.json", "utf8"));
 
R("example/ex-async.R")
  .data({df: attitude, nGroups: 3, fxn: "mean" })
  .call(function(err, d) {
    if (err) throw err;
    console.log(d);
  });*/

app.listen(4000, () => console.log('It\'s work!'))