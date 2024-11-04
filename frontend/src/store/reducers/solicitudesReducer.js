// src/store/reducers/solicitudesReducer.js

const initialState = {
    solicitudesCount: 0,
};

const solicitudesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SOLICITUDES_COUNT':
            return {
                ...state,
                solicitudesCount: action.payload,
            };
        case 'DECREMENT_SOLICITUDES_COUNT':
            return {
                ...state,
                solicitudesCount: state.solicitudesCount - action.payload,
            };
        case 'INCREMENT_SOLICITUDES_COUNT':
            return {
                ...state,
                solicitudesCount: state.solicitudesCount + action.payload,
            };
        default:
            return state;
    }
};

export default solicitudesReducer;
