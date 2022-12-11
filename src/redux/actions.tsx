export const SET_MOVIES_SEARCH_QUERY = 'SET_MOVIES_SEARCH_QUERY'; 
export const SET_SHOWS_SEARCH_QUERY = 'SET_SHOWS_SEARCH_QUERY'; 

export function setMoviesSearchQuery(query: string) {
    return {
        type: SET_MOVIES_SEARCH_QUERY,
        query
    }
};

export function setShowsSearchQuery(query: string) {
    return {
        type: SET_SHOWS_SEARCH_QUERY,
        query
    }
};
