// src/store/actions/solicitudesActions.js

export const setSolicitudesCount = (count) => ({
    type: 'SET_SOLICITUDES_COUNT',
    payload: count,
});

export const decrementSolicitudesCount = (amount = 1) => ({
    type: 'DECREMENT_SOLICITUDES_COUNT',
    payload: amount,
});

export const incrementSolicitudesCount = (amount = 1) => ({
    type: 'INCREMENT_SOLICITUDES_COUNT',
    payload: amount,
});
