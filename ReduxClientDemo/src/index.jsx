import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer.js';
import {setState} from './action_creators.js';
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App.jsx';
import Voting from './components/Voting.jsx';
import Results from './components/Results.jsx';
import {VotingContainer} from './components/Voting.jsx';
import {ResultsContainer} from './components/Results.jsx';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
	store.dispatch(setState(state))
)

const createStoreWithMiddleware = applyMiddleware(
	remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);

const routes = <Route component={App}>
	<Route path='/results' component={ResultsContainer} />
	<Route path='/' component={VotingContainer} />
</Route>;

ReactDOM.render(
	<Provider store={store}>
		<Router>{routes}</Router>
	</Provider>, 
	document.getElementById('app')
);