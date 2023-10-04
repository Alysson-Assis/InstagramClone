import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import * as firebase from 'firebase/app';
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBfnZ267xPvUmyuwsw8AeIdVtu3jh47PP4",
  authDomain: "instagram-dev-fab21.firebaseapp.com",
  projectId: "instagram-dev-fab21",
  storageBucket: "instagram-dev-fab21.appspot.com",
  messagingSenderId: "135528694306",
  appId: "1:135528694306:web:f128b2d14f96beba45007b",
  measurementId: "G-TCY03TWNRZ"
};

if( firebase.getApps().length === 0) {
   firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './componentes/autent/Landing'
import RegisterScreen from './componentes/autent/Register'
import LoginScreen from './componentes/autent/Login';

const Stack = createStackNavigator();
const auth = getAuth()

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
  
  componentDidMount() {
    auth.onAuthStateChanged(( user ) => {
      if( !user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else{
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
      
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if( !loaded ){
      return(<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading .....</Text>
      </View>
      )
    }
    if (! loggedIn){
      return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}}/>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
      </NavigationContainer>
      );
    }
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>User is logged</Text>
      </View>
    )    
  }
}

export default App



