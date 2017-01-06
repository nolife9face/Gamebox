(function() {
    const database = require('./database')
    const Q = require('q')

    module.exports.saveYahtzeeGame = saveYahtzeeGame;

    var yahtzeeGame = database.createModel('yahtzeeGame', {
        totalScore: {
            type: Number,
            required: true
        },
        bonusGotten: {
            type: Boolean,
            required: true
        }
    });

    function saveYahtzeeGame(total, bonus){
        yahtzeeGame.create({ totalScore: total, bonusGotten: bonus === 35 }, function (err, newThing) {});
    }
}());