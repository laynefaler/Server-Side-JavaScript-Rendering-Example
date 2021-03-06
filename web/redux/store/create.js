import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';
import { __CLIENT__, __DEVELOPMENT__ } from '../../globals';


export default function createStore(history, data) {
	// Sync dispatched route actions to the history
	const reduxRouterMiddleware = routerMiddleware(history);

	const middleware = [reduxRouterMiddleware, thunk, ReduxPromise];

	let finalCreateStore;
	if (__CLIENT__ && __DEVELOPMENT__) {
		let logger = createLogger();
		finalCreateStore = compose(
			applyMiddleware(...middleware, logger),
		)(_createStore);
	} else {
		finalCreateStore = applyMiddleware(...middleware)(_createStore);
	}

	const reducer = require('../reducers/combine');
	const store = finalCreateStore(reducer, data);

	return store;
}
