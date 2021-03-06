require("dotenv").config();

var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");

// Create a new keys object
var spotify = new Spotify(keys.spotify);


// Grab search command line argument
var command = process.argv[2].toLowerCase();
var userSearch = process.argv.slice(3).join(" ");

var divider = "\n------------------------------------------------------------\n\n";

// SHOW SEARCH

// findShow takes in the name of a tv show and searches the tvmaze API
var findShow = function () {
  var URL = "http://api.tvmaze.com/singlesearch/shows?q=" + userSearch;

  axios.get(URL).then(function (response) {
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
    fs.appendFile("log.txt", showData + divider, function (err) {
      if (err) throw err;
      console.log(showData);
    });
  });
};

// ACTOR SEARCH

var findActor = function () {
  var URL = "http://api.tvmaze.com/search/people?q=" + userSearch;
  axios.get(URL).then(function (response) {
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
    fs.appendFile("log.txt", actorData + divider, function (err) {
      if (err) throw err;
      console.log(actorData);
    });
  });
}
// MOVIE SEARCH

var findMovie = function () {
  if (!userSearch) {
    userSearch = 'Mr. Nobody';
  }
  var URL = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy"
  axios.get(URL).then(function (response) {
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
    fs.appendFile("log.txt", movieData + divider, function (err) {
      if (err) throw err;
      console.log(movieData);
    });
  });
};

// CONCERT SEARCH
var findConcert = function () {
  console.log("artist")
  var URL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp"
  axios.get(URL).then(function (response) {
    // Place the response.data into a variable, jsonData.
    var jsonData = response.data;
    for (i = 0; i < jsonData.length; i++) {
      var concertData = [
        "Name of Venue: " + jsonData[i].venue.name,
        "Location of Venue: " + jsonData[i].venue.city + ", " + jsonData[i].venue.country,
        "Date of Event: " + moment(jsonData[i].datetime).format("MM/DD/YY"),
      ].join("\n\n");
      console.log(concertData)
    }
    // Append concertData and the divider to log.txt, print concertData to the console
    fs.appendFile("log.txt", concertData + divider, function (err) {
      if (err) throw err;
      console.log(concertData);
    });
  });
};

// SONG SEARCH
function findSong() {
  console.log("find song!")
  if (!userSearch) {
    userSearch = 'The Sign';
  }
  spotify.search({ type: 'track', query: userSearch }, function (err, data) {
    if (err) {
      return
    }
    //Handle Data
    var albumTrack = data.tracks.items;

    for (i = 0; i < albumTrack.length; i++) {
      var artistString = ""
      for (j = 0; j < albumTrack[i].artists.length; j++) {
        artistString = artistString.concat(albumTrack[i].artists[j].name + ", ")
      }
      console.log("Artist: " + artistString);
      console.log("Album Title: " + albumTrack[i].album.name);
      console.log("Spotify Link: " + albumTrack[i].preview_url);
      console.log("Track Title: " + albumTrack[i].name);
    }
  });
}

// DO WHAT IT SAYS FUNCTION -- PULLING IT FROM RANDOM.TXT
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
    // Then split it by commas (to make it more readable)
    var array = data.split(", ");
    console.log(array);
    command = array[0];
    userSearch = array[1];
    switchCommand();
  });
}
// Switch command for user when searching for a show, actor, movie, song, or concert.

function switchCommand() {
  switch (command) {
    case "show":
      console.log("User is searching for a", command, "called", userSearch);
      findShow();
      break;
    case "actor":
      console.log("User is searching for an", command, "by the name of", userSearch);
      findActor();
      break;
    case "movie":
      console.log("User is searching for a", command, "by the name of", userSearch);
      findMovie();
      break;
    case "song":
      console.log("User is searching for a", command, "by the name of", userSearch);
      findSong();
      break;
    case "artist":
      console.log("User is searching for an", command, "by the name of", userSearch);
      findConcert();
      break;
    case "random":
      doWhatItSays();
      break;
  }
}
switchCommand();