import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initState = {
  board: [],
  status: '',
  difficulty: '',
  name: '',
  leaderboard: []
}

function reducer(state= initState, action){
  switch (action.type){
    case "SET_BOARD":
      return {...state, board: action.payload}
    case "SET_STATUS":
      return {...state, status: action.payload}
    case "SET_DIFFICULTY":
      return {...state, difficulty: action.payload}
    case "SET_NAME":
      return {...state, name: action.payload}
    case "SET_LEADERBOARD":
      return {...state, leaderboard: action.payload}
    default:
      return state
  }
}

const store = createStore(reducer,applyMiddleware(thunk))

export default store