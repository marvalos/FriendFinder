// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friends = require("../app/data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/friends', (req, res) => {
    res.json(friends);
});

app.post('/api/friends', (req, res) => {
    // difference is 40 because our survey has results 1-5
    let difference = 40;
    let matchingFriend = "";

    // forEach loop to go through the data in friends.js
    friends.forEach((friend) => {
        let scoreComparison = [];
        let totalDifference = 40;

        function add(total, score) {
            return total + score;
        }

        for (var i = 0; i < friend.scores.length; i++) {
            scoreComparison.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));
        }

        // Reduces the scoreComparison array into a single value in a variable
        totalDifference = scoreComparison.reduce(add, 0);

        if (totalDifference < difference) {
            difference = totalDifference;
            matchingFriend = friend.name;
        }
    });
    res.json({
        name: matchingFriend,
    });
    friends.push(req.body);
});
}
