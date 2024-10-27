/* eslint-disable prettier/prettier */
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import noteInfo from './reducers';

const rootReducer = combineReducers({noteInfo});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
