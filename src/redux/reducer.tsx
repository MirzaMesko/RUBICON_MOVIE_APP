// @ts-ignore
import { SET_MOVIES_SEARCH_QUERY, SET_SHOWS_SEARCH_QUERY } from "./actions.tsx"

const initialState = {
    moviesSearchQuery: '',
    showsSearchQuery: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_MOVIES_SEARCH_QUERY:
        return { 
            ...state,
            moviesSearchQuery: action.query
         }
      case SET_SHOWS_SEARCH_QUERY:
        return { 
            ...state,
            showsSearchQuery: action.query
         }
      default:
        return state
    }
  }

  export default reducer;