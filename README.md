# LIRI-Bot
A command line node app that acts as a Language Interpretation and Recognition Interface

This app allows you to search for where your favorite bands are playing as well as find out key information on songs and movies.  All from the comfort of your Terminal.

Each command entered is logged to a log.txt file for future reference using the fs.appendFile method.

### Using the app

To use this app you'll simply need to follow a few steps:

* To search for information on where a band is playing, type the following:

        node liri.js concert-this "name of the band in quotation marks"

* To search for information on a song, type the following:

        node liri.js spotify-this-song "name of the song in quotation marks"

* To search for information on a movie, type the following:

        node liri.js movie-this "name of the movie in quotation marks"

* To search for items that are listed in the random.txt file, simply type:
    
        node liri.js do-what-it-says

### Technologies used
* node js
* axios
* chalk
* dotenv
* moment
* node-spotify-api

### Developer Information
Developed by Sylvia Jonon in Austin, TX.