(function() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/{{appname}}');

    module.exports.createModel = createModel;

    function createModel(name, structure){
        return mongoose.model(name, structure);
    }

}());