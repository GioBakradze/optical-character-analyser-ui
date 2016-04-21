var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();

app.set('views', __dirname + '/public');
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.post('/process', function (req, res) {
    fs.writeFile("images/image.jpg", req.body.image.replace(/^data:image\/jpeg;base64,/, ""), 'base64', function(err) {
        if (err) {
            res.status(501).send('server error');
        } else {
            res.status(200).send('ok');
        }
    });
});

app.get('*', function (req, res) {
    res.status(200).send('index');
});

app.listen(8080, function () {
    console.log('web server listening on ' + 8080);
});
