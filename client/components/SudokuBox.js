import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import SudokuNumber from './SudokuNumber'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function SudokuBox(props){
  const box = props.box
  const changeNumber = (index,value) => {
    props.changeNumber(props.index,index,value)
  }
  return(
    <View style={[styles.kotak]}>
      {
        box.map((el,i) => {
          return <SudokuNumber key={i} number={el} index={i} editable={el.editable} changeNumber={changeNumber}/>
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  kotak: {
    backgroundColor: '#FFF',
    height: windowWidth*0.1,
    width: '100%',
    // borderStyle: "solid",
    flexDirection: 'row',
    padding: 0
  }
})