import { useEffect, useState } from 'react';
import './App.css';

import ErrorBoundary from './components/core/ErrorBoundary/ErrorBoundary';

import { UserProvider } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';

import Header from './components/core/Header/Header';
import Main from './components/core/Main/Main';
import Footer from './components/core/Footer/Footer';
import EndGameModal from './components/core/EndGameModal/EndGameModal';

/**
 * The root component that handles all the shared app states.
 * @returns The three main components (Header, Main, Footer).
 */
export default function App() {
	const [endgameModalVisible, setEndgameModalVisible] = useState(false);

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
					/>}
				</GameProvider>
			</UserProvider>
		</ErrorBoundary>
	</>;
};