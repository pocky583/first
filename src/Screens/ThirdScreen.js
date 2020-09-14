import * as React from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from './LoginScreen';
import MoreScreen from './More';
import RendName from '../Redux/components/RendName';



function HomeScreen({ navigation }) { 
  return (
    <ScrollView style={{flex:1}}>
      <View style={{paddingLeft: 20,height: 130, flexDirection:'row', alignItems:'center'}}>
        <View style={{ width: 60, height: 60}}>
          <Image style={{resizeMode: "cover", height: '100%', width: '100%', borderRadius: 100}} source={require("../images/profile.png")}/>
        </View>
        <RendName></RendName>
        <View style={{flexDirection:'column', alignItems:'flex-end', width:200}}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={{height:50,width:130, backgroundColor:'violet', justifyContent:'center', alignItems:'center'}}>
              <Text>임시 로그인 버튼</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{height: 400}}>
        <View style={{flex:1, paddingTop:15, paddingBottom:10, borderBottomWidth:0.5, borderBottomColor:'gray', backgroundColor:'#fffacd', paddingLeft:20}}>
          <View style={{flex:1.3, }}>
            <Text style={{fontSize: 20}}>주문내역</Text>
          </View>
          <View style={{flex:5, justifyContent:'center', alignItems:'center'}}>
            <Text>이미지 자리</Text>
          </View>
          <View style={{flex:1, alignItems:'flex-end',justifyContent:'center', paddingRight:10}}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('More')}>
                  <Text style={{fontSize: 15}}>더보기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{flex:1.3, paddingTop:15, paddingBottom:10, backgroundColor:'#fffacd', paddingLeft:20}}>
          <View style={{flex:1, }}>
            <Text style={{fontSize: 20}}>둘러본 공방</Text>
          </View>
          <View style={{flex:5, justifyContent:'center', alignItems:'center'}}>
            <Text>이미지 자리</Text>
          </View>
          <View style={{flex:1, alignItems:'flex-end',justifyContent:'center', paddingRight:10}}>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('More')}>
                  <Text style={{fontSize: 15}}>더보기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginTop:40}}>
        <View style={{borderBottomColor:'gray', borderBottomWidth:0.5}}>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <View style={{height:45, justifyContent:'center', backgroundColor:'#fffacd', paddingLeft:20}}>
              <Text style={{fontSize:20}}>쪽지함</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomColor:'gray', borderBottomWidth:0.5}}>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <View style={{height:45, justifyContent:'center', backgroundColor:'#fffacd', paddingLeft:20}}>
              <Text style={{fontSize:20}}>내 정포</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <View style={{height:45, justifyContent:'center', backgroundColor:'#fffacd', paddingLeft:20}}>
              <Text style={{fontSize:20}}>프로필 관련 항목</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop:40}}>
        <View style={{borderBottomColor:'gray', borderBottomWidth:0.5}}>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <View style={{height:45, justifyContent:'center', backgroundColor:'#fffacd', paddingLeft:20}}>
              <Text style={{fontSize:20}}>공지사항</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{borderBottomColor:'gray', borderBottomWidth:0.5}}>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <View style={{height:45, justifyContent:'center', backgroundColor:'#fffacd', paddingLeft:20}}>
              <Text style={{fontSize:20}}>문의</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate('More')}>
            <View style={{height:45, justifyContent:'center', backgroundColor:'#fffacd', paddingLeft:20}}>
              <Text style={{fontSize:20}}>로그아웃</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
}



const Stack = createStackNavigator();

export default function ThirdScreen(){
  return (
    <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="More" component={MoreScreen}/>
    </Stack.Navigator>
  );
}


