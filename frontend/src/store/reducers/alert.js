import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
export const INITIAL_STATE = [];

export const alertReducer = (state, action) => {
    console.log(action)
    
    switch(action.type) {
        case SET_ALERT:
            return [...state, action.payload];
        case REMOVE_ALERT:
            console.log(state)
            return state.filter(alert => alert.id === action.payload);

        default:
            return state;
    }
}