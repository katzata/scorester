# Scorester

### A score keeping app for board games, card games, dice games, etc.

Works online as well as offline. Being online is needed when changing settings within the app in order to store them to the database, and to keep a summary of all finished games (if selected).
In case there is no connection the app shows an offline indicator and silently moves forward.
The user chooses the number of players (can be changed during a game session) and the app automatically generates a player column containing a player name "Player 1|2|3..." (if a previous game session exists it takes the corresponding name from there).

As long as the user does not clear the browser data all states (isLogged, isPlaying, etc.) will persist after refreshing the page or closing the browser.

Written in React.js with an express rest api as a back end.

Tested on all major browsers (Chrome, Edge, Firefox, Opera, Safari).

Further documentation can be found within the components themselves.

***
### Keyboard functionality :
- Escape
- - Closes the score input modal.
- - Closes the user menu modal.
- - Closes the settings menu modal.
- - Cancels the player name editing (ignoring all changes).
- - Cancels the player score editing (ignoring all changes).

- Enter
- - Confirms score input (score input modal).
- - Confirms the player name editing.
- - Confirms the player score editing.

- Pause
- - Pauses and unpauses the game.
</br>

***
### Available game settings
- Number of players (input)
- Game timer (toggle)
- Individual timers (toggle)
- Target score (input)
- Editable score fields (toggle)
</br>

***
### Back end
    The back end is an ExpressJs rest API also written by me. The authentication is done with JWT, and cookies.