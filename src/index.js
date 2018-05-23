import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import thunk from 'redux-thunk';
import createSagaMiddleWare from 'redux-saga';
import {watchAuth , watchBurgerBuilder , watchOrder} from './store/sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const burgerReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orders: orderReducer,
    auth : authReducer
});

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(burgerReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleWare)
));

sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(watchBurgerBuilder);
sagaMiddleWare.run(watchOrder);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
