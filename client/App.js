import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import screens from './screens'
import {Provider} from 'react-redux'
import store from './store'

const Stack = createStackNavigator()

export default function App() {
  return(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={screens.Main} options={{title: 'Sugoku'}}/>
          <Stack.Screen name="Game" component={screens.Game} options={{title: 'Sugoku'}}/>
          <Stack.Screen name="Finish" component={screens.Finish}/>
          <Stack.Screen name="Leaderboard" component={screens.Score}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
