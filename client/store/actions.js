const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');


export const setDifficulty = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_DIFFICULTY',
      payload: payload
    })
  }
}
export const setName = (payload) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_NAME',
      payload: payload
    })
  }
}

export const submitBoard = () => {
  return (dispatch, getState) => {
    const boards = getState().board
    let tobeSubmitted = boards.map(el => {
      let arr1 = el.map(el2 => {
        return el2.value
      })
      return arr1
    })
    let tobeSubmitted2 = {
      board: tobeSubmitted
    }
    return fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeParams(tobeSubmitted2)
    })
  }
}

export const getBoard = () => {
  return (dispatch, getState) => {
    const difficulty = getState().difficulty
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(res => res.json())
      .then(({board}) =>{
        let out = board.map(el => {
          let arr1 = el.map(el2 => {
            if(el2 == 0){
              return {
                value: el2,
                editable: true
              }
            }else{
              return {
                value: el2,
                editable: false
              }
            }
          })
          return arr1
        })
        dispatch({
          type: 'SET_BOARD',
          payload: out
        })
      })
  }
}
export const setBoard = (board) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'SET_BOARD',
      payload: board
    })
  }
}

export const solveBoard = () => {
  return (dispatch,getState) => {
    const boards = getState().board
    let tobeSubmitted = boards.map(el => {
      let arr1 = el.map(el2 => {
        return el2.value
      })
      return arr1
    })
    let tobeSubmitted2 = {
      board: tobeSubmitted
    }
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeParams(tobeSubmitted2)
    })
      .then(response => response.json())
      .then(({solution}) => {
        let out = solution.map(el => {
          let arr1 = el.map(el2 => {
            if(el2 == 0){
              return {
                value: el2,
                editable: true
              }
            }else{
              return {
                value: el2,
                editable: false
              }
            }
          })
          return arr1
        })
        dispatch({
          type: 'SET_BOARD',
          payload: out
        })
      })
      .catch(err => console.log(err))
  }
}

export const setLeaderboard = (newScore) => {
  return(dispatch,getState) => {
    let leaderboard = getState().leaderboard
    leaderboard.push(newScore)
    leaderboard.sort((a,b)=>b.time - a.time)
    dispatch({
      type: 'SET_LEADERBOARD',
      payload: leaderboard
    })
  }
}