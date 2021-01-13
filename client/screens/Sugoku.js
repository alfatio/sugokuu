import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ScrollView, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import SudokuBox from './components/SudokuBox'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Sugoku() {
  const [boards, setBoards] = useState([])
  const [status, setStatus] = useState("")
  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  const encodeParams = (params) => {
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');
  }
  useEffect(() => {
    fetch('https://sugoku.herokuapp.com/board?difficulty=easy')
      .then(res => res.json())
      .then(({board}) =>{
        setBoards(board)
      })
  },[])
  const submitBoard = () => {
    console.log('submitting')
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams(boards),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response)
        if(response.status === "unsolved"){
          setStatus("unsolved")
        }
        setTimeout(() => {
          setStatus("")
        },2000)
      })
      .catch(err => console.log(err))
  }
  const changeNumber = (i1,i2,value) => {
    let newBoard = [...boards]
    newBoard[i1][i2] = value
    setBoards(newBoard)
  }
  if(boards.length < 1){
    return(
      <Text>Loading...</Text>
    )
  }
  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
      <Text style={{backgroundColor: '#00FFFF', height: windowHeight*0.08, textAlign: 'center', textAlignVertical: 'center'}}>SUGOKU</Text>
      {status ? <Text style={{backgroundColor: '#FF3333', height: windowHeight*0.08, textAlign: 'center', textAlignVertical: 'center'}}>{status}</Text> : <></>}
      <View style={[styles.board]}>
        {
          boards.map((el,i) => {
            return <SudokuBox key={i} box={el} index={i} changeNumber={changeNumber}/>
          })
        }
      </View>
      <View style={{width: windowWidth*0.5, alignSelf:'center', marginTop: 10, marginBottom: 10}}>
        <Button onPress={submitBoard} title="Submit" />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  board: {
    flexDirection: 'row',
    maxHeight: windowHeight*0.8,
    width: windowWidth,
    marginTop: windowHeight*0.05,
    flexWrap: 'wrap',
    padding: 3
  },
  kotak: {
    backgroundColor: '#FF99CC',
    height: 150,
    width: '33%',
    borderStyle: "solid",
    borderWidth: 2,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  kotakKecil: {
    backgroundColor: '#FFFF33',
    height: '33.33%',
    width: '33.33%',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  kotakKecil2: {
    backgroundColor: '#FF6666',
    height: '33%',
    width: '33%'
  }
});
