var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// MORE IMPORTS HERE

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  var date = new Date()
  var time = date.getTime()
  console.log('time: ', time)
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

app.post('/', function (req, res) {
  // console.log("contact post request : ", req)
});

app.get('/upload', function (req, res) {
  app.render('upload-file');
});

app.use(function (req, res, next) {
  console.log('app.use function was called')
  console.log("Looking for URL : ", req.url);
  next();
});

app.get('/junk', function (req, res, next) {
  console.log("Tried to access the /junk URL");
  throw new Error('/junk doesn\'t exist');
});

app.use(function (err, req, res, next) {
  console.log('app.use ERROR was called')
  console.log('Error : ', err.message);
  next();
})

app.listen(app.get('port'), function () {
  console.log("Express started on http://localhost:" + app.get('port') + " press Ctrl-C to terminate");
});
