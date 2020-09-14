import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
//import MapView from 'react-native-daummap';


function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/*<MapView>}
        </MapView>*/}
      </View>
    );
}


const Stack = createStackNavigator();

export default function SecondScreen(){
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}