var express = require('express');
var app = express();

app.set('views', __dirname + '/public')
app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
    res.status(200).send('index');
});

app.listen(8080, function () {
    console.log('web server listening on ' + 8080);
});
