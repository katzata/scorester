import { useState } from 'react';
import './App.css';

// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

import { UserProvider } from './contexts/UserContext';
import { GameProvider } from './contexts/GameContext';
import { ErrorsProvider } from './contexts/ErrorsContext';

import Header from './components/core/Header/Header';
import Main from './components/core/Main/Main';
import Footer from './components/core/Footer/Footer';
import EndGameModal from './components/core/EndGameModal/EndGameModal';
import MessageModal from './components/core/MessageModal/MessageModal';

/**
 * The root component that handles all the shared app states.
 * @returns The three main components (Header, Main, Footer).
 */
export default function App() {
	const [endgameModalVisible, setEndgameModalVisible] = useState(false);

	return <>
		{/* <ErrorBoundary> */}
			<ErrorsProvider>
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
			</ErrorsProvider>
		{/* </ErrorBoundary> */}
	</>;
};