require("dotenv").config();

var KEYS = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// Create a new keys object
var keys = new KEYS();

// Grab search command line argument
var command = process.argv[2].toLowerCase();
var userSearch = process.argv.slice(3).join(" ");

// Switch command for user when searching for a show, actor, movie, song, or concert.

function switchCommand() {
  switch (command) {
    case "show":
      console.log("User is searching for a", command, "called", userSearch);
      keys.findShow(userSearch);
      break;
    case "actor":
      console.log("User is searching for an", command, "by the name of", userSearch);
      keys.findActor(userSearch);
      break;
    case "movie":
      console.log("User is searching for a", command, "by the name of", userSearch);
      keys.findMovie(userSearch);
      break;
    case "song":
      console.log("User is searching for a", command, "by the name of", userSearch);
      keys.findSong(userSearch);
      break;
    case "artist":
      console.log("User is searching for a", command, "by the name of", userSearch);
      keys.findConcert(userSearch);
      break;

  }
}
switchCommand();
