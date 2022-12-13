import { useEffect, useState } from 'react';
import './App.css';

import { checkIfLogged } from './services/userService';

import Header from './components/core/Header/Header';
import Main from './components/core/Main/Main';
import Footer from './components/core/Footer/Footer';

function App() {
	const [ isLogged, setIsLogged ] = useState(false);

	useEffect(() => {
		checkIfLogged().then(res => setIsLogged(res));
	}, [isLogged]);

	return <>
		<Header isLogged={isLogged} handleLoggedState={setIsLogged}/>
		<Main isLogged={isLogged} />
		<Footer isLogged={isLogged} />
	</>;
};

export default App;