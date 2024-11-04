// src/store/reducers/index.js
import { combineReducers } from 'redux';
import solicitudesReducer from './solicitudesReducer';

const rootReducer = combineReducers({
    solicitudes: solicitudesReducer,
    // Aquí puedes agregar más reducers si los necesitas
});

export default rootReducer;
