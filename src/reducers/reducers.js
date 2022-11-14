import { combineReducers } from 'Redux';
import { SET_FILTER, SET_MOVIES,LOG_IN } from '../actions/actions';

function visibilityFilter(state='', action) {
    //enables the visibility filter, the state and the action are combined
    switch (action.type) {
        case SET_FILTER:
            //Switch/case: This syntax states that if the given action is unrelated to 
            //the reducer, then it should return whatever state it’s been given.
            return action.value;
            default:
                return state;
                //if no changes, return to existing state
    }
}

function movies(state = [], action) {
    //finds a specific film in the array
    switch(action.type) {
        case SET_MOVIES:
            return action.value;
    //returns the desired film
            default:
                return state;
    }
}

function loggedIn(state = false, action){
    switch(action.type) {
        case LOG_IN:
            return action.value;
    //returns the desired film
            default:
                return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    loggedIn
  //returns the app with the combined vis filter and the movies state as needed
});

export default moviesApp;