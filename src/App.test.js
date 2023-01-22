import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import App from './App';

test('Renders the app', () => {
	act(() => {
		render(<App />);
	});
});