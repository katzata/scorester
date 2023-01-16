# Scorester

### A score keeping app for board games, card games, dice games, etc.

Written in React.js with very few dependencies.

Works online as well as offline. Being online is needed when changing settings within the app in order to store them to the database, and to keep a summary of all finished games (if selected).
In case there is no connection the app shows an offline indicator and silently moves forward.
The player chooses the number of players (can be changed during a game session) and the app automatically generates a player column containing a preset player name "Player 1|2|3..." (if a previous game session exists it takes the corresponding name from there). As long as the user does not clear the browser data all states (isLoged, isPLaying, etc.) will persist after refreshing the page or closing the browser.

Further technical documentation can be found within the components themselves.
</br>

### Available user settings

- keep a record of your finished games.
</br></br>

### Available game settings

- number of players (input)
- game timer (toggle)
- individual timers (toggle)
- timed turns duration (input) ***
- auto switch turns (toggle)
- allow negative values (toggle) ***
- score can go below zero (toggle)
- target score (input)
- editable score fields (toggle)

***
Settings marked with *** are under consideration and may not make it to the final build.
***

### Back end

The back end is an ExpressJs based rest API also written by me. The authentication is done with JWT, and cookies and it all happens through HTTPS.