import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text , Button, Dimensions,ScrollView} from 'react-native'
import styles from '../styles'
import SudokuBox from '../components/SudokuBox'
import { LongPressGestureHandler, State } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from'react-redux'
import { getBoard, submitBoard ,setBoard, solveBoard , setLeaderboard} from '../store/actions'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Game() {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const {name,board,status,difficulty} = useSelector(state => state)
  const [waktu, setWaktu] = useState(300)
  
  let a = 0
   
  const decrement = () => {
    setWaktu(waktu - 1)
    if(waktu === 0){
      clearTimeout(a)
    }
  }

  const cheat = () => {
    dispatch(solveBoard())
  }

  const submit = () => {
    dispatch(submitBoard())
      .then(response => response.json())
      .then(response => {
        if(response.status === "unsolved"){
          dispatch({
            type: 'SET_STATUS',
            payload: 'unsolved'
          })
          setTimeout(() => {
            dispatch({
              type: 'SET_STATUS',
              payload: ''
            })
          },2000)
        }else{
          let player = {
            name: name,
            time: waktu
          }
          dispatch(setLeaderboard(player))
          navigation.replace('Finish',{
            waktu: waktu
          })
        }
      })
  }
  
  useEffect(()=>{
    dispatch(getBoard())
  },[])

  useEffect(()=>{
    if(waktu > 0){
      a = setTimeout(decrement,1000)
    }else{
      clearTimeout(a)
      navigation.replace('Finish', {
        waktu: 0
      })
    }
    return ()=>{
      clearTimeout(a)
    }
  },[waktu])

  const changeNumber = (i1,i2,value) => {
    let newBoard = [...board]
    newBoard[i1][i2].value = value
    dispatch(setBoard(newBoard))
  }

  if(board.length < 1){
    return(
      <Text>Loading...</Text>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{backgroundColor: '#00FFFF', height: windowHeight*0.03, textAlign: 'center', textAlignVertical: 'center'}}>SUGOKU</Text>
      {status ? <Text style={{backgroundColor: '#FF3333', height: windowHeight*0.03, textAlign: 'center', textAlignVertical: 'center'}}>{status}</Text> : <></>}
      <View style={{flexDirection:'row',marginHorizontal:windowWidth*0.01,height:windowHeight*0.03,justifyContent:'space-between'}}>
        <Text style={{marginHorizontal:windowWidth*0.01}}>{name}</Text>
        <Text style={{marginHorizontal:windowWidth*0.01}}>waktu: {`${waktu}`}</Text>
        <Text style={{marginHorizontal:windowWidth*0.01}}>{difficulty}</Text>
      </View>
      <ScrollView>
      <View style={[styles.board]}>
        {
          board.map((el,i) => {
            return <SudokuBox key={i} box={el} index={i} changeNumber={changeNumber}/>
          })
        }
      </View>
      <LongPressGestureHandler minDurationMs={2000} maxDist={30} onHandlerStateChange={({nativeEvent})=> {
        if (nativeEvent.state === State.ACTIVE) {
          cheat()
        }
      }}>
        <View style={{width: windowWidth*0.5, alignSelf:'center', marginTop: 10, marginBottom: 10}}>
          <Button onPress={submit} title="Submit" />
        </View>
      </LongPressGestureHandler>
      </ScrollView>
    </SafeAreaView>
  )
}
