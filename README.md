# Scorester

### A score keeping app for board games, card games, dice games, etc.

Works online as well as offline. Being online is needed when changing settings within the app in order to store them to the database, and to keep a summary of all finished games (if selected).
In case there is no connection the app shows an offline indicator and silently moves forward.
The user chooses the number of players (can be changed during a game session) and the app automatically generates a player column containing a player name "Player 1|2|3..." (if a previous game session exists it takes the corresponding name from there).
As long as the user does not clear the browser data all states (isLogged, isPlaying, etc.) will persist after refreshing the page or closing the browser.

Written in React.js with an express rest api as a back end.

Further technical documentation can be found within the components themselves.


***
### Keyboard functionality :
- Escape
- - Closes the score input modal.
- - Closes the user menu modal.
- - Closes the settings menu modal.

- Enter
- - Confirms score input (score input modal).

- Pause
- - Pauses and unpauses the game.
</br>

***
### Available game settings
- number of players (input)
- game timer (toggle)
- individual timers (toggle)
- target score (input)
- editable score fields (toggle)
</br>

***
### Back end
The back end is an ExpressJs based rest API also written by me. The authentication is done with JWT, and cookies and it all happens through HTTPS.