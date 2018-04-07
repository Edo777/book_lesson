var express = require('express');
const fortune = require("./lib/fortune");
var app = express();

//handlebars
var handlebars = require('express-handlebars')
    .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//port
app.set('port', process.env.PORT || 3000);
//statics
app.use(express.static(__dirname + '/public'));

//routes
app.get('/', function (req, res) {
    res.type('text/html');
    res.render('home');
});
app.get('/about', function (req, res) {
    res.type('text/html');
    console.log(req.ip)
    res.render('about', {fortune : fortune.getFortune()});
});

// пользовательская страница 404
app.use(function (req, res) {
    res.status(404);
    res.type('text/html');
    res.render('404');
});
// пользовательская страница 500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.type('text/html');
    res.render('500');
});
app.listen(app.get('port'), function () {
    console.log('Express запущен на http://localhost:' +
        app.get('port') + '; нажмите Ctrl+C для завершения.');
});