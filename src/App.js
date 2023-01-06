import { useCallback, useEffect, useState } from 'react';
import './App.css';

import { setStorage, getStorage/* , saveToStorage */ } from './services/storageService';
import { checkIfLogged, initUserDetails } from './services/userService';

import Header from './components/core/Header/Header';
import Main from './components/core/Main/Main';
import Footer from './components/core/Footer/Footer';

const initialGameData = getStorage("scGameDetails") || {};

/**
 * The root component that handles all the shared app states.
 * @returns The three main components (Header, Main, Footer).
 */
export default function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [isPlaying, setIsPlaying] = useState(initialGameData.isPlaying || false);
	const [gamePaused, setGamePaused] = useState(initialGameData.gamePaused || false);
	const [numberOfPlayers, setNumberOfPlayers] = useState(null);
	const [playerNames, setPlayerNames] = useState((initialGameData.scores && initialGameData.scores.map(el => el.name)) || []);
	const [playerTurnIndex, setPlayerTurnIndex] = useState(initialGameData.playerTurnIndex || 0);
	const [mainTimerVisible, setMainTimerVisible] = useState(initialGameData.mainTimerVisible || false);
    const [individualTimersVisible, setIndividualTimersVisible] = useState(initialGameData.individualTimersVisible || false);

	/**
	 * Initializes the player details object.
	 * Sets both the "scUserDetails" and "scGameDetails" objects in local storage
	 * @param {Object} playerData An object containing userDetials which will be validated.
	 * @param {Boolean} skipInit If set to true skips the user details initialization and passes the received playerData directly to the local storage.
	 */
	const initPlayerData = (playerData, skipInit) => {
		const userDetails = !skipInit ? initUserDetails(playerData) : playerData;
		const gameDetails = getStorage("scGameDetails") || {};

		if (userDetails && userDetails.gameSettings) {
			const { username, gameSettings } = userDetails;
			const playersCalc = Number(gameSettings.numberOfPlayers);
			const nameOptions = (idx) => (gameDetails.scores && gameDetails.scores[idx] && gameDetails.scores[idx].name) || `Player ${idx + 1}`;
			const names = [...Array(playersCalc).keys()].map(nameOptions);

			if (username && username !== "") {
				names[0] = username;
			};

			setNumberOfPlayers(playersCalc);
			setPlayerNames(names);
			setMainTimerVisible(gameSettings.mainTimer);
			setIndividualTimersVisible(gameSettings.individualTimers);
			
			if (gameDetails && gameDetails.playerTurnIndex) {
				setPlayerTurnIndex(gameDetails.playerTurnIndex);
			};

		};

		setStorage({ key: "scUserDetails", value: userDetails });
	};

	const initGameData = (state) => {
		if (gamePaused) {
			setGamePaused(false);
		};

		if (state) {
			const gameDetails = {
				isPlaying: state,
				gamePaused: false,
				playerTurnIndex: 0,
				mainTimer: [0, 0, 0],
				individualTimers: [...Array(numberOfPlayers).fill([0, 0, 0])],
				scores: [...Array(numberOfPlayers).keys()].map(el => ({ name: playerNames[el], scores: [] }))
			};

			setStorage({ key: "scGameDetails", value: gameDetails });
		};
	};

	const handleIsPlayingState = (state) => {
		setIsPlaying(state);
		initGameData(state);
	};

	const handleLoggedState = useCallback((loggedState, playerData) => {
		setIsLogged(loggedState);
		initPlayerData(playerData || getStorage("scUserDetails"), loggedState);
	}, [])

	const handlePlayerNameEdit = (index, newName) => {
		const localData = getStorage("scGameDetails");
		const newPlayerNames = [...playerNames];

		localData["scores"][index].name = newName
		newPlayerNames[index] = newName;

		setPlayerNames(newPlayerNames);
		setStorage({ key: "scGameDetails", value: localData });
	};

	const handlePlayerTurnIndex = () => {
		const turnIndex = playerTurnIndex + 1 < numberOfPlayers ? playerTurnIndex + 1 : 0;
		const localData = getStorage("scGameDetails");
		localData.playerTurnIndex = turnIndex;

		setStorage({ key: "scGameDetails", value: localData });
		setPlayerTurnIndex(turnIndex < numberOfPlayers ? turnIndex : 0);
	};

	useEffect(() => {
		// const userData = getStorage("scUserDetails") || {};
		checkIfLogged(initialGameData && initialGameData.id).then(handleLoggedState);
	}, [handleLoggedState, gamePaused]);

	return <>
		<Header
			isLogged={isLogged}
			isPlaying={isPlaying}
			gamePaused={gamePaused}
			playerNames={playerNames}
			playerTurnIndex={playerTurnIndex}
			handleLoggedState={handleLoggedState}
			numberOfPlayers={numberOfPlayers}
			setNumberOfPlayers={setNumberOfPlayers}
			mainTimerVisible={mainTimerVisible}
			mainTimerToggle={setMainTimerVisible}
			individualTimersVisible={individualTimersVisible}
			individualTimersToggle={setIndividualTimersVisible}
		/>

		<Main
			isPlaying={isPlaying}
			gamePaused={gamePaused}
			numberOfPlayers={numberOfPlayers}
			playerNames={playerNames}
			setPlayerName={handlePlayerNameEdit}
			playerTurnIndex={playerTurnIndex}
			playerTurnIndexHandler={handlePlayerTurnIndex}
		/>

		<Footer
			isLogged={isLogged}
			isPlaying={isPlaying}
			gamePaused={gamePaused}
			setIsPlaying={handleIsPlayingState}
			setGamePaused={setGamePaused}
			mainTimerVisible={mainTimerVisible}
			individualTimersVisible={individualTimersVisible}
		/>
	</>;
};