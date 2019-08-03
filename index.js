var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.send('Hey express works!');
});

app.get('/time', function (req, res) {
  var date = today()
  res.send('The current date is: ', date)
})

app.listen(app.get('port'), function () {
  console.log('Express started press Ctrl-C to terminate');
})


function today() {
  var date = new Date();
  var current_hour = date.getHours();
  var current_hour = date.getHours();
  console.log('date: ', date)
}
