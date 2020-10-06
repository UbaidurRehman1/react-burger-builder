import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import BurgerBuilderReducer from "./store/reducers/BurgerBuilder";
import OrderReducer from "./store/reducers/order";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const rootReducer = combineReducers(
    {
        burgerBuilder: BurgerBuilderReducer,
        order: OrderReducer
    }
);

const store = createStore(rootReducer,  composeWithDevTools(
    applyMiddleware(thunk)
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App/>
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
