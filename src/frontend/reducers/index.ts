import { combineReducers } from 'redux';

export interface GlobalState {
    count: number
}

const counterReducer = (count = 0, action: any) => {
    if (action.type === 'INCREMENT_COUNTER') {
        return count + action.increment;
    }
    return count;
};

export default combineReducers({
    count: counterReducer,
});
