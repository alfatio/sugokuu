import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import SudokuNumber from './SudokuNumber'

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
    backgroundColor: '#FF99CC',
    height: 150,
    width: '33%',
    borderStyle: 'solid',
    borderWidth: 1.5,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})