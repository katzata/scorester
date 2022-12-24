import { useEffect, useState } from 'react';
import './App.css';

import { checkIfLogged } from './services/userService';

import Header from './components/core/Header/Header';
import Main from './components/core/Main/Main';
import Footer from './components/core/Footer/Footer';
import { initStorage } from './services/storageService';

const localData = initStorage();

function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [numberOfPlayers, setNumberOfPlayers] = useState(1);
	const [playerNames, setPlayerNames] = useState([]);
	const [playerTurnIndex/* , setPlayerTurnIndex */] = useState(0);

	const handlePlayerData = () => {
		if (localData && localData.gameSettings) {
			const { username, gameSettings } = localData;
			const playersCalc = Number(gameSettings.numberOfPlayers);
			const names = [...Array(playersCalc).keys()].map(el => `Player ${el + 1}`);

			if (username) {
				names[0] = username;
			};

			setNumberOfPlayers(playersCalc);
			setPlayerNames(names);
		};
	};

	useEffect(() => {
		if (!isLogged) {
			checkIfLogged().then(res => {
				if (res) {
					setIsLogged(res);
					handlePlayerData();
				};
			});
		};

		handlePlayerData();
	}, [isLogged]);

	return <>
		<Header
			isLogged={isLogged}
			handleLoggedState={setIsLogged}
			numberOfPlayers={numberOfPlayers}
			setNumberOfPlayers={setNumberOfPlayers}
		/>
		<Main numberOfPlayers={numberOfPlayers} playerNames={playerNames} playerTurnIndex={playerTurnIndex}/>
		<Footer isLogged={isLogged} />
	</>;
};

export default App;