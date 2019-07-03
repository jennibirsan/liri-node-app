// js
// console.log('this is loaded');

// exports.spotify = {
//   id: process.env.SPOTIFY_ID,
//   secret: process.env.SPOTIFY_SECRET
// };

var axios = require("axios");
var fs = require("fs");

var KEYS = function() {

  var divider = "\n------------------------------------------------------------\n\n";
  // findShow takes in the name of a tv show and searches the tvmaze API
  this.findShow = function(show) {
    var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + show;

    axios.get(URL).then(function(response) {
      // Place the response.data into a variable, jsonData.
      var jsonData = response.data;

      // showData ends up being the string containing the show data we will print to the console
      var showData = [
        "Show: " + jsonData.name,
        "Genre(s): " + jsonData.genres.join(", "),
        "Rating: " + jsonData.rating.average,
        "Network: " + jsonData.network.name,
        "Summary: " + jsonData.summary
      ].join("\n\n");

      // Append showData and the divider to log.txt, print showData to the console
      fs.appendFile("log.txt", showData + divider, function(err) {
        if (err) throw err;
        console.log(showData);
      });
    });
  };

  this.findActor = function(actor) {
    var URL = "http://api.tvmaze.com/search/people?q=" + actor;
    axios.get(URL).then(function(response) {
      // Place the response.data into a variable, jsonData.
      var jsonData = response.data;

      // actorData ends up being the string containing the actor data we will print to the console
      var actorData = [
        "Actor: " + jsonData[0].person.name,
        "Birthday: " + jsonData[0].person.birthday,
        "Gender: " + jsonData[0].person.gender,
        "Country: " + jsonData[0].person.country.name,
        "URL: " + jsonData[0].person.url

      ].join("\n\n");

      // Append actorData and the divider to log.txt, print actorData to the console
      fs.appendFile("log.txt", actorData + divider, function(err) {
        if (err) throw err;
        console.log(actorData);
      });
    });
    };

    // MOVIE

    this.findMovie = function(movie) {
      var URL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy"
      axios.get(URL).then(function(response) {
        // Place the response.data into a variable, jsonData.
        var jsonData = response.data;
  
        // movieData ends up being the string containing the movie data we will print to the console
        var movieData = [
          "Movie Title: " + jsonData.Title,
         "Release Year: " + jsonData.Year,
          "IMBD Rating: " + jsonData.imdbRating,
         "Country: " + jsonData.Country,
          "Language: " + jsonData.Language,
       "Plot: " + jsonData.Plot,
        "Actors: " + jsonData.Actors,
        ].join("\n\n");
  
        // Append movieData and the divider to log.txt, print movieData to the console
        fs.appendFile("log.txt", movieData + divider, function(err) {
          if (err) throw err;
          console.log(movieData);
        });
      });
      };
};




module.exports = KEYS;