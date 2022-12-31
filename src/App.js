import { useCallback, useEffect, useState } from 'react';
import './App.css';

import { checkIfLogged } from './services/userService';

import Header from './components/core/Header/Header';
import Main from './components/core/Main/Main';
import Footer from './components/core/Footer/Footer';
import { initUserDetails, setStorage, getStorage } from './services/storageService';

export default function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [gamePaused, setGamePaused] = useState(false);
	const [numberOfPlayers, setNumberOfPlayers] = useState(null);
	const [playerNames, setPlayerNames] = useState([]);
	const [playerTurnIndex, setPlayerTurnIndex] = useState(0);
	const [mainTimerVisible, setMainTimerVisible] = useState(false);
    const [individualTimersVisible, setIndividualTimersVisible] = useState(false);
	
	const handlePlayerData = () => {
		const userDetails = initUserDetails();
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
			
			if (gameDetails) {
				setPlayerTurnIndex(gameDetails.playerTurnIndex);
			};
		};
	};

	const handleGameData = (state) => {
		const localData = getStorage("scUserDetails");

		if (gamePaused) {
			setGamePaused(false);
		};

		if (state) {
			const { individualTimers } = localData.gameSettings;
			const gameDetails = {
				isPlaying: state,
				gamePaused: false,
				playerTurnIndex: 0,
				timer: [0, 0, 0],
				individualTimers: individualTimers ? [...Array(numberOfPlayers).fill([0, 0, 0])] : [],
				scores: [...Array(numberOfPlayers).keys()].map(el => ({ name: playerNames[el], scores: [] }))
			};

			setStorage({ key: "scGameDetails", value: gameDetails });
		};
	};

	const handleIsPlayingState = (state) => {
		setIsPlaying(state);
		handleGameData(state);
	};

	const mainTimerToggle = (state) => {
		setMainTimerVisible(state);
	};

	const individualTimersToggle = (state) => {
		setIndividualTimersVisible(state);
	};

	const handleLoggedState = useCallback((state) => {
		setIsLogged(state);
		handlePlayerData();
	}, [])

	const handlePlayerNameEdit = (index, newName) => {
		const localData = getStorage("scGameDetails");
		const newPlayerNames = [...playerNames];
		console.log(localData["scores"]);
		localData["scores"][index].name = newName
		newPlayerNames[index] = newName;

		setPlayerNames(newPlayerNames);
		setStorage({ key: "scGameDetails", value: localData });
	};

	const handlePlayerTurnIndex = () => {
		const turnIndex = playerTurnIndex + 1;
		setPlayerTurnIndex(turnIndex < numberOfPlayers ? turnIndex : 0);
	};

	useEffect(() => {
		checkIfLogged().then(handleLoggedState);
	}, [handleLoggedState]);

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
			mainTimerToggle={mainTimerToggle}
			individualTimersVisible={individualTimersVisible}
			individualTimersToggle={individualTimersToggle}
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
			setGamePaused={setGamePaused}
			setIsPlaying={handleIsPlayingState}
			mainTimerVisible={mainTimerVisible}
			individualTimersVisible={individualTimersVisible}
		/>
	</>;
};