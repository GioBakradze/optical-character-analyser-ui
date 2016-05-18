var express = require('express');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var fs = require("fs");
var app = express();

app.set('views', __dirname + '/public');
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

app.post('/process', function (req, res) {
    var postfix = new Date().getTime();
    fs.writeFile(
        "./images/image-" + postfix + ".jpg",
        req.body.image.replace(/^data:image\/jpeg;base64,/, ""),
        'base64',
        function(err) {
            if (err) {
                res.status(501).send(err);
            } else {

                var cmd = 'cd analyser && java -jar analyser.jar ../images/image-' + postfix + ".jpg";
                exec(cmd, function(error, stdout, stderr) {
                    console.log(stdout);
                    console.log(stderr);
                    if (stderr) {
                        res.status(501).send(stderr);
                    } else {

                        fs.readFile('./analyser/outputs/' + Number(stdout) + '.txt', 'utf8', function (err, data) {
                            if (err) {
                                res.status(501).send(err);
                            } else {
                                res.status(200).send(data);
                            }
                        });
                    }
                });

            }
        });
});

app.get('*', function (req, res) {
    res.status(200).send('index');
});

app.listen(8080, function () {
    console.log('web server listening on ' + 8080);
});
