// console.log(process.argv);
require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var chalk = require("chalk");

var keys = require("./keys.js");

var action = process.argv[2];
var query = process.argv[3];

var spotify = new Spotify(keys.spotify);
var bandUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
var movieUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";

// console.log(query);

switch (action) {
    case "spotify-this-song":
        if (query === undefined) {
            console.log("Try entering the name of a song in 'quotation marks' to search for a particular song. Here's Ace of Base's 'The Sign' to get you started.");
            console.log("\n");
            query = "the sign ace of base";
            song();
            break;
        } else {
            song();
            break;
        }
    case "concert-this":
        band();
        break;
    case "movie-this":
        if (process.argv.length <3){
            query = "mr nobody";
            console.log(movieUrl);
            console.log("Try entering the name of a movie in 'quotation marks' to search for a particular movie. Here's 'Mr. Nobody' to get you started.");
            console.log("\n");
            movie();
            break;
        } else {
            movie();
            break;
        }
    case "do-what-it-says":
        random();
        break;
}
//functions to run program:
//concert-this <band name here>: will search Bands in Town API and render the following info - name of venue, venue location, date of event (formatted to MM/DD/YYYY with moment)
//query URL for bands in town: ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")

function band() {
    axios.get(bandUrl).then(function (response) {
        // console.log(response.data[0]);
        console.log(chalk.blue("This is where ") + chalk.magenta.bold(query) +chalk.blue( " will be playing:"));
        console.log(chalk.yellow("Venue: ")+ response.data[0].venue.name);
        console.log(chalk.yellow("Location: ") + response.data[0].venue.city + ", " + response.data[0].venue.region);
        console.log(chalk.green("Date: ") + moment(response.data[0].datetime).format("MM/DD/YYYY hh:mma"));
        console.log("\n");
    })
}
//spotify-this-song '<song name here>': Show info on Artist, song name, preview link of song from spotify, album the song is from, if no song provided then program
//will return "The Sign" by Ace of Base. Spotify package will return these results

function song() {
    spotify.search({ type: "track", limit: 2, query: query }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        // console.log(JSON.stringify(data.tracks, null, 2));
        console.log(chalk.yellow("Song: ") + (data.tracks.items[0].name));
        console.log(chalk.yellow("Artist: ") + (data.tracks.items[0].artists[0].name));
        console.log(chalk.yellow("Album: ") + (data.tracks.items[0].album.name));
        console.log(chalk.yellow("Song Preview: ") + (data.tracks.items[0].preview_url));
        console.log("\n");
    });
}

//movie-this <movie name>: will return title of movie, year movie came out, imdb rating, rotten tomatoes rating, country where the movie was produced, 
// language of the movie, plot, actors.  If no movie is entered program will return "Mr. Nobody" data.
function movie() {
    axios.get(movieUrl).then(
        function (response) {
            // console.log(response.data);
            console.log(chalk.bgWhite.magenta.bold("-------Movie Information-------"));
            console.log(chalk.green("Title: ") + response.data.Title);
            console.log(chalk.green("Year of release: ") + response.data.Year);
            console.log(chalk.cyan("\n-------Ratings-------"));
            console.log(chalk.green("IMDB Rating: ") + response.data.Ratings[0].Value);
            console.log(chalk.green("Rotten Tomatoes Rating: ") + response.data.Ratings[1].Value);
            console.log(chalk.cyan("\n-------Country and Language-------"));
            console.log(chalk.green("Country: ") + (response.data.Country));
            console.log(chalk.green("Movie language: ") + (response.data.Language));
            console.log(chalk.cyan("\n-------Plot and Actors-------"));
            console.log(chalk.green("Plot: \n") + response.data.Plot);
            console.log(chalk.green("Actors: ") + response.data.Actors);
            console.log("\n");
        })
}

//do-what-it-says: using the fs node package liri will take the text inside of random.txt and then use it to call one of the LIRI commands.
//should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Edit the .txt file to test out the feature for movie-this and concert-this
function random() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log("There was an error.")
        }
        var randomTxt = data.split(",");
        action = randomTxt[0];
        query = randomTxt[1];
        if (action === "spotify-this-song"){
            song();
        }else if (action === "movie-this"){
            movie();
        }else if (action === "concert-this"){
            band();
        }else{
            console.log("Invalid text file")
        }
    })
}

fs.appendFile("log.txt", action + " " + query + "\n", function(err){
    if(err){
        console.log(err)
    }
})