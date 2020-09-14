import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FirstScreen} from './src/Screens/FirstScreen'
import SecondScreen from './src/Screens/SecondScreen'
import ThirdScreen from './src/Screens/ThirdScreen'
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './src/Redux/reducers'


const Tab = createBottomTabNavigator();

function TabNav(){
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home-outline';
        } else if (route.name === 'Mypage') {
          iconName = focused ? 'person-circle' : 'person-circle-outline'; 
        } else if (route.name === 'search') {
          iconName = focused ? 'ios-search' : 'ios-search-outline';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'red',
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="Home" component={FirstScreen} />
    <Tab.Screen name="search" component={SecondScreen} />
    <Tab.Screen name="Mypage" component={ThirdScreen} />
  </Tab.Navigator>
  );
}



export default function App() {
  return (
    <Provider store={createStore(reducers)}>
      <NavigationContainer>
        <TabNav></TabNav>
      </NavigationContainer>
    </Provider>
  );
}