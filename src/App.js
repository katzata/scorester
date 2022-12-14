import { useEffect, useState } from 'react';
import './App.css';

import { checkIfLogged } from './services/userService';

import Header from './components/core/Header/Header';
import Main from './components/core/Main/Main';
import Footer from './components/core/Footer/Footer';
import { getStogare } from './services/storageService';

function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [numberOfPlayers, setNumberOfPlayers] = useState(1);
	
	useEffect(() => {
		const { gameSettings } = getStogare("scUserDetails");

		if (gameSettings && gameSettings.numberOfPlayers) {
			setNumberOfPlayers(Number(gameSettings.numberOfPlayers));
		};

		checkIfLogged().then(res => setIsLogged(res));
	}, [isLogged]);

	return <>
		<Header isLogged={isLogged} handleLoggedState={setIsLogged} setNumberOfPlayers={setNumberOfPlayers}/>
		<Main numberOfPlayers={numberOfPlayers} />
		<Footer isLogged={isLogged} />
	</>;
};

export default App;