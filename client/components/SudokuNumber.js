import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView, TextInput } from 'react-native';

export default function SudokuNumber(props){
  const [number, setNumber] = useState(props.number)
  const changeNumber = (value) => {
    props.changeNumber(props.index,value)
  }
  return(
    <View style={[styles.kotakKecil]}>
      <TextInput value={`${props.number}`} onChangeText={(text) => {
        if(Number(text) > 9 && Number(text)){
          text = text.split('')[1]
          text = +text
        }else{
          text = +text
        }
        // setNumber((Number(text)? Number(text) : 0))
        changeNumber(text)
      }}></TextInput>
    </View>
  )
}

const styles = StyleSheet.create({
  kotakKecil: {
    backgroundColor: '#FFFF33',
    height: '33.33%',
    width: '33.33%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 2
  }
})