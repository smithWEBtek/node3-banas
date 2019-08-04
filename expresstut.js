var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// MORE IMPORTS HERE

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (eq, res) {
  res.render('home');
});

app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/contact', function (req, res) {
  res.render('contact');
});

app.post('/intake-contact', function (req, res) {
  console.log("contact data: ", req)
  // res.render('contact');
});

app.get('/upload', function (req, res) {
  app.render('upload-file');
});

app.listen(app.get('port'), function () {
  console.log("Express started on http://localhost:" + app.get('port') + " press Ctrl-C to terminate");
});
