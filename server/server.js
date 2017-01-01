(function() {
    const express = require('express')
    const app = express()
    const bodyParser = require('body-parser')
    const methodOverride = require('method-override')
    const models = require('./models')

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // listen (start app with node server.js) ======================================
    app.listen(8080);

    app.post('/api/saveYahtzee', function(req, res) {
        var total = req.body.total;
        var bonus = req.body.bonus;
        models.saveYahtzeeGame(total, bonus);
    });
}());