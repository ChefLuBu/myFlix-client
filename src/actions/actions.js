export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const LOG_IN = 'LOG_IN';

export function setMovies(value) {
  return { 
        type: SET_MOVIES, 
        value 
    };
}

export function setFilter(value) {
  return { 
        type: SET_FILTER, 
        value 
    };
}

export function setLoggedIn(value){
  return{
    type: LOG_IN,
    value: value
  }
}

