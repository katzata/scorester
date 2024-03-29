// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};

const fetchMock = (url) => {
	const jsonRes = require(`../public/${url}`)
	return Promise.resolve(JSON.stringify(jsonRes));
};

global.localStorage = localStorageMock;
global.fetch = fetchMock;