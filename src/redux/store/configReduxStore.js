import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index';

export default configReduxStore = (initialState = {}) => {
    const middleware = compose(applyMiddleware(thunk))
    
    return createStore(rootReducer, initialState, middleware)
} 