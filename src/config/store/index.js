import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../redux/reducers';

const initialData = {};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = compose(
    composeEnhancers(applyMiddleware(thunk))
);

const store = createStore(reducers, initialData, enhancer);

export default store;
