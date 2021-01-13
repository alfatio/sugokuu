import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView, TextInput } from 'react-native';

// backgroundColor: (a ? '#FFFF33' : '#3333FF')

export default function SudokuNumber(props){
  const editable = props.editable
  const changeNumber = (value) => {
    props.changeNumber(props.index,value)
  }
  return(
    <View style={[styles.kotakKecil,{backgroundColor: (editable ? '#FF9999' : '#99FF99')}]}>
      {
        editable ? 
        <TextInput value={props.number.value === 0 ? "" : `${props.number.value}`} onChangeText={(text) => {
          if(Number(text) > 9 && Number(text)){
            text = text.split('')[1]
            text = +text
          }else if(!Number(text)){
            text = 0
          }else{
            text = +text
          }
          changeNumber(text)
        }} style={{textAlign:'center'}}>
          
        </TextInput>
        :
        <Text style={{textDecorationColor: 'red'}}>{props.number.value}</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  kotakKecil: {
    height: '100%',
    width: '11.11%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  }
})