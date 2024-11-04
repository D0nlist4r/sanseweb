// src/store/store.js
import { createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    // Habilitar Redux DevTools Extension si está disponible
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
