import { useNavigation } from '@react-navigation/native'
import React, {useState} from 'react'
import { View,  Button,  TextInput, Dimensions,Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles'
import {Picker} from '@react-native-picker/picker'
import { useDispatch } from 'react-redux'
import { setDifficulty ,setName} from '../store/actions'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Main() {
  const navigation = useNavigation()
  const [name, setName2] = useState("")
  const [diff,setDiff] = useState('easy')
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={[styles.container,{justifyContent: 'center', alignItems: 'center'}]}>
        <Image source={{uri: 'https://thumbs.dreamstime.com/b/man-sudoku-18444093.jpg'}} style={{height: windowHeight*0.1,width:windowWidth*0.8}}/>
      <View style={{marginTop:windowHeight*0.2}}>
        <TextInput style={styles.input} value={name} placeholder="insert playername here" onChangeText={(t) => {
          setName2(t)
        }}></TextInput>
        <Picker
          selectedValue={diff}
          style={{height: windowHeight*0.04, width: windowWidth*0.5,paddingVertical:windowHeight*0.03,marginBottom:windowHeight*0.1}}
          onValueChange={(a)=>{
            setDiff(a)
          }}
          >
          <Picker.Item label="easy" value={"easy"} />
          <Picker.Item label="medium" value={"medium"} />
          <Picker.Item label="hard" value={'hard'} />
        </Picker>
        <Button title="start" onPress={() => {
          dispatch(setDifficulty(diff))
          dispatch(setName(name))
          dispatch({
            type: 'SET_BOARD',
            payload: []
          })
          navigation.navigate('Game')
          setName2("")
          setDiff("easy")
        }}/>
      </View>
    </SafeAreaView>
  )
}

