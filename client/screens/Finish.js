import React from 'react'
import { View, Text, Button, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

export default function Finish(props) {
  const params = props.route.params
  const navigation = useNavigation()
  const { name,leaderboard } = useSelector(state => state)
  return (
    <SafeAreaView style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <ScrollView style={{ maxHeight: windowHeight*0.4, width: windowWidth*0.8}}>
        <View style={{flexDirection:'row',maxHeight:windowHeight*0.06,width:'100%',justifyContent:'center',marginBottom:windowHeight*0.02}}>
          <Text style={{fontSize:windowHeight*0.05}}>LEADERBOARD:</Text>
        </View>
        <View style={{flexDirection:'row',maxHeight:windowHeight*0.06,width:'100%',justifyContent:'space-between',marginBottom:windowHeight*0.02,paddingHorizontal:windowWidth*0.14}}>
          <Text style={{fontSize:windowHeight*0.02}}>PLAYER:</Text>
          <Text style={{fontSize:windowHeight*0.02}}>TIME LEFT:</Text>
        </View>
        {
          leaderboard.map((el,i) => {
            return(
              <View key={i} style={{flexDirection:'row',maxHeight:windowHeight*0.05,width:'100%',justifyContent:'space-between',paddingHorizontal:windowWidth*0.14}}>
                <Text>{el.name}</Text>
                <Text>{el.time}</Text>
              </View>
            )
          })
        }
      </ScrollView>
      <View style={{alignItems:'center',marginTop: windowHeight*0.01}}>
        <Text>{!params.waktu ? "Too Bad...." : "Congratulations!!!!!!"}</Text>
        <Text>{name}</Text>
        <Text style={{marginBottom: windowHeight*0.1}}>Time left: {params.waktu ? params.waktu : 0}s</Text>
        <Button title="Back to Home" onPress={()=>{
          navigation.navigate('Main')
        }}/>
      </View>
    </SafeAreaView>
  )
}
