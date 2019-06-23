console.log(process.argv);
require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");

var keys = require("./keys.js");

var action = process.argv[2];
var query = process.argv[3];

var spotify = new Spotify(keys.spotify);
var bandUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
var movieUrl = "http://www.omdbapi.com/?t=" +query+ "&y=&plot=short&apikey=trilogy";

console.log(query);

switch (action){
case "spotify-this-song":
    song();
    break;
case "concert-this":
    band();
    break;
case "movie-this":
    movie();
    break;
}
//functions to run program:
//concert-this <band name here>: will search Bands in Town API and render the following info - name of venue, venue location, date of event (formatted to MM/DD/YYYY with moment)
    //query URL for bands in town: ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")

    function band(){
        axios.get(bandUrl).then(function(response){
            console.log(response);
            console.log("Venue: ");
            console.log("Location: ");
            console.log("Date: ");
        })
    }
//spotify-this-song '<song name here>': Show info on Artist, song name, preview link of song from spotify, album the song is from, if no song provided then program
    //will return "The Sign" by Ace of Base. Spotify package will return these results

function song(){
    console.log(query);
    spotify.search({type: "track", limit: 1, query: query}, function (err, data){
        if (err) {
            return console.log("Error occurred: "+ err);
        }
    // console.log(data.tracks);
    console.log("Album: "+ (data.tracks.items[0].album.name));
    console.log("Artist: "+ (data.tracks.items[0].artists[0].name));
    console.log("Song: "+ (data.tracks.items[0].name));
    console.log("Song Preview: "+ (data.tracks.items[0].preview_url));
    });
}
//movie-this <movie name>: will return title of movie, year movie came out, imdb rating, rotten tomatoes rating, country where the movie was produced, 
    // language of the movie, plot, actors.  If no movie is entered program will return "Mr. Nobody" data. axios package will return these results
console.log(movieUrl);
function movie(){
    axios.get(movieUrl).then(
        function(response){
        // console.log(response.data);
        console.log("Title: "+response.data.Title);
        console.log("Year of release: " +response.data.Year);
        console.log("IMDB Rating: "+response.data.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: "+response.data.Ratings[1].Value);
        console.log("Country: "+ (response.data.Country));
        console.log("Movie language: "+ (response.data.Language));
        console.log("Plot: "+response.data.Plot);
        console.log("Actors: "+response.data.Actors);



    })
}

//do-what-it-says: using the fs node package liri will take the text inside of random.txt and then use it to call one of the LIRI commands.
    //should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    //Edit the .txt file to test out the feature for movie-this and concert-this


//BONUSES:
    //in addition to logging to the terminal, log to a file called log.txt
    //make sure you append each command you run to the log.txt file.
    //Do not overwrite your file each time you run a command

//If time:
    //incorporate Chalk and Chalk Animations node packages for styling