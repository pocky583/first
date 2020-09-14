import * as React from 'react';
import { Text, View, Image, ScrollView} from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';


function HomeScreen() {
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>안녕하세요</Text>
        </View>
    );
  }

export default function MoreScreen() {
    return HomeScreen();
}