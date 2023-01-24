import { /* useCallback,  */useEffect, useState/* , useContext  */} from 'react';
import './App.css';

import { getStorage/* , saveToStorage */ } from './services/storageService';
// import { /* checkIfLogged,  */initUserDetails } from './services/userService';
import ErrorBoundary from './components/core/ErrorBoundary/ErrorBoundary';

import { UserProvider } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';

import Header from './components/core/Header/Header';
import Main from './components/core/Main/Main';
import Footer from './components/core/Footer/Footer';
import EndGameModal from './components/core/EndGameModal/EndGameModal';
// import useFetch from './hooks/useFetch';

const initialGameData = getStorage("scGameDetails") || {};

/**
 * The root component that handles all the shared app states.
 * @returns The three main components (Header, Main, Footer).
 */
export default function App() {
	const [mainTimerVisible, setMainTimerVisible] = useState(initialGameData.mainTimerVisible || false);
    const [individualTimersVisible, setIndividualTimersVisible] = useState(initialGameData.individualTimersVisible || false);
	const [endgameModalVisible, setEndgameModalVisible] = useState(false);


	/**
	 * Initializes the player details object.
	 * Sets both the "scUserDetails" and "scGameDetails" objects in local storage
	 * @param {Object} playerData An object containing userDetials which will be validated.
	 * @param {Boolean} skipInit If set to true skips the user details initialization and passes the received playerData directly to the local storage.
	 */
	// const initPlayerData = (playerData, skipInit) => {
	// 	// const userDetails = !skipInit ? initUserDetails(playerData) : playerData;
	// 	// const gameDetails = getStorage("scGameDetails") || {};

	// 	// if (userDetails && userDetails.gameSettings) {
	// 	// 	const { username, gameSettings } = userDetails;
	// 	// 	const playersCalc = Number(gameSettings.numberOfPlayers) || 1;
	// 	// 	const nameOptions = (idx) => (gameDetails.scores && gameDetails.scores[idx] && gameDetails.scores[idx].name) || `Player ${idx + 1}`;
	// 	// 	const names = [...Array(playersCalc).keys()].map(nameOptions);

	// 	// 	if (username && username !== "") {
	// 	// 		names[0] = username;
	// 	// 	};

	// 	// 	setNumberOfPlayers(playersCalc);
	// 	// 	setPlayerNames(names);
	// 	// 	setMainTimerVisible(gameSettings.mainTimer);
	// 	// 	setIndividualTimersVisible(gameSettings.individualTimers);
			
	// 	// 	if (gameDetails && gameDetails.playerTurnIndex) {
	// 	// 		setPlayerTurnIndex(gameDetails.playerTurnIndex);
	// 	// 	};
	// 	// };

	// 	// setStorage({ key: "scUserDetails", value: userDetails });
	// };

	/**
	 * 
	 * @param {Boolean} state The isPlaying state
	 */
	// const resetGameData = (state) => {
	// 	// if (gamePaused) {
	// 	// 	setGamePaused(false);
	// 	// };

	// 	// const gameDetails = {
	// 	// 	isPlaying: state,
	// 	// 	gamePaused: false,
	// 	// 	playerTurnIndex: 0,
	// 	// 	mainTimer: [0, 0, 0],
	// 	// 	individualTimers: [...Array(numberOfPlayers).fill([0, 0, 0])],
	// 	// 	scores: [...Array(numberOfPlayers).keys()].map(el => ({ name: playerNames[el], scores: [] }))
	// 	// };

	// 	// setStorage({ key: "scGameDetails", value: gameDetails });
	// 	// handlePlayerTurnIndex(0);
	// };

	/**
	 * Set the isPlaying state with the passed parameter. 
	 * @param {Boolean} state The isPlayng state.
	 */
	// const handleIsPlayingState = (state) => {
	// 	if (!state) {
	// 		// handleEndgameModal(true);
	// 	} else {
	// 		// resetGameData(state);
	// 	};
		
	// 	// setIsPlaying(state);
	// };

	/**
	 * Set the user logged state hook.
	 * Initialize player data.
	 * @useCallback
	 */
	// const handleLoggedState = useCallback((loggedState, playerData) => {
	// 	// setIsLogged(loggedState);
	// 	initPlayerData(playerData || getStorage("scUserDetails"), loggedState);
	// }, []);

	// const handlePlayerTurnIndex = (index) => {
		// const turnIndex = playerTurnIndex + 1 < numberOfPlayers ? playerTurnIndex + 1 : 0;
		// const indexFinal = index !== undefined ? index : turnIndex;
		// const localData = getStorage("scGameDetails");
		// localData.playerTurnIndex = indexFinal;

		// setStorage({ key: "scGameDetails", value: localData });
		// setPlayerTurnIndex(indexFinal);
	// };

	useEffect(() => {
		// console.log(initialGameData);
		// checkIfLogged(initialGameData && initialGameData.id).then(handleLoggedState);
		// initPlayerData(getStorage("scUserDetails"), false);
	}, []);

	return <>
		<ErrorBoundary>
			<UserProvider>
				<GameProvider>
					<Header/>
					<Main/>
					<Footer endGameModalVisibilityHandler={setEndgameModalVisible}/>

					{endgameModalVisible && <EndGameModal
						isVisible={endgameModalVisible}
						visibilityHandler={setEndgameModalVisible}
						mainTimerVisible={mainTimerVisible}
						individualTimersVisible={individualTimersVisible}
					/>}
				</GameProvider>
			</UserProvider>
		</ErrorBoundary>
	</>;
};