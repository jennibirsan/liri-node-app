require("dotenv").config();

var KEYS = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

// Create a new TV object
var keys = new KEYS();

// Grab search command line argument
var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

if (!search) {
  search = "movie";
}

if (!term) {
  term = "Prisoners";
}

// Print whether searching for a show or actor, print the term as well
if (search === "show") {
  console.log("Searching for TV Show");
  keys.findShow(term);
} else if (search === "actor"){
    keys.findActor(term);
  console.log("Searching for TV Actor");
} else if (search === "movie"){
        keys.findMovie(term);
        console.log("Searching for Movie");
    
}

