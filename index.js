var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var Papa = require('babyparse');
var fs = require('fs');
var file = 'test.csv';

var dta = [];
var ap = '{"ifsc":"23","bank_id":"23","branch":"sdf ","address":"sdffd","city":"f","district":"sdf","state":"sd","bank_name":"sdf"}';
var content = fs.readFileSync(file, { encoding: 'binary' });
var i=0;
Papa.parse(content, {
    download: true,
    delimiter: ",",
skipemptylines: true,
header: true,
    step: function(row){
        ap = (row.data); 
        dta.push(ap[0]);
}
});




app.get('/api',function(req,res)
{
  var p = req.param('ifsc');
  var q = req.param('city');
  var r = req.param('bank_name');
var data=[];
  for(var i = 0; i < dta.length; i++) {
    if(p == dta[i].ifsc ||  q == dta[i].city || r == dta[i].bank_name){

     data.push(dta[i]); 
    }

   }
  res.send(data); 
});

app.listen(port);
console.log("server is running on port "+port);