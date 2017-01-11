(function() {
    const database = require('./database')
    const Q = require('q')

    module.exports.saveYahtzeeGame = saveYahtzeeGame;
    module.exports.getYahtzeeStats = getYahtzeeStats;

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

    function getYahtzeeStats(){
        var average = 0;

        return getAllYahtzeeGames()
        .then(function(games){
            return {
                totalGamePlayed: games.length,
                averageScore: calculateYahtzeeAverage(games),
                numberOfBonus: calculateYahtzeeBonusGotten(games),
                maxScore: calculateYahtzeeMax(games),
                minScore: calculateYahtzeeMin(games)
            }
        });
    }

    function getAllYahtzeeGames(){
        var yahtzeeGames = [];

        return Q(yahtzeeGame.find({}).exec())
        .then(function(games) {
            games.forEach(function(game){
                yahtzeeGames.push({totalScore: game.totalScore, bonusGotten: game.bonusGotten});
            })
            return yahtzeeGames;
        });
    }

    function calculateYahtzeeAverage(games){
        var average = 0;
        var total = 0;

        games.forEach(function(game){
            total += game.totalScore;
        });

        average = total / games.length;

        return average;
    }

    function calculateYahtzeeBonusGotten(games){
        var bonusGotten = 0;

        games.forEach(function(game){
            if(game.bonusGotten){
                bonusGotten++;
            }
        });

        return bonusGotten;
    }

    function calculateYahtzeeMax(games){
        var max = 0;

        games.forEach(function(game){
            if(game.totalScore > max){
                max = game.totalScore;
            }
        });

        return max;
    }

    function calculateYahtzeeMin(games){
        var min = 0;

        min = games.length === 0 ? 0 : games[0].totalScore;

        games.forEach(function(game){
            if(game.totalScore < min){
                min = game.totalScore;
            }
        });

        return min;
    }

}());