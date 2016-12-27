(function() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/gamebox');

    module.exports.createModel = createModel;

    function createModel(name, structure){
        return mongoose.model(name, structure);
    }

}());