var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// IMPORTS
app.use(require('body-parser').urlencoded({ extended: true }));

var formidable = require('formidable');

var credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));

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
  res.render('contact', { csrf: 'CSRF token here' });
});

app.get('/thankyou', function (req, res) {
  res.render('thankyou');
});

app.post('/process', function (req, res) {
  console.log('Form : ' + req.query.form);
  console.log('CRSF token : ' + req.body._csrf);
  console.log('Email : ' + req.body.email);
  console.log('Question : ' + req.body.ques);
  res.redirect(303, '/thankyou');
});

app.get('/file-upload', function (req, res) {
  var now = new Date()
  res.render('file-upload', {
    year: now.getFullYear(),
    month: now.getMonth()
  })
});

app.post('/file-upload/:year/:month', function (req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, file) {
    if (err)
      return res.redirect(303, '/error')
    console.log('Received File')
    // console.log('year: ', params["year"])
    // console.log('month: ', params["month"])
    console.log('file info: ', file)
    res.redirect(303, '/thankyou')
  });
});

app.get('/cookie', function (req, res) {
  res.cookie('username', 'Brad Smith', {
    expire: new Date() + 9999
  }).send('username has the value of Brad Smith');
});


// cookies
app.get('/listcookies', function (req, res) {
  console.log("Cookies : ", req.cookies);
  res.send('Look in the console for cookies');
});

app.get('/deletecookie', function (req, res) {
  res.clearCookie('username');
  res.send('username Cookie Deleted');
});

// ERRORS and handling
app.get('/error', function (req, res) {
  res.render('error');
});

app.use(function (req, res, next) {
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

app.use(function (req, res) {
  res.type('text/html');
  res.status(404);
  res.render('404');
});

app.use(function (req, res, next) {
  res.type('text/html');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function () {
  console.log("Express started on http://localhost:" + app.get('port') + " press Ctrl-C to terminate");
});
