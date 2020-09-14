import React, {useState} from 'react';
import {Text, TextInput, View, SafeAreaView, ScrollView, Button, TouchableOpacity} from 'react-native';
import KakaoLogins from '@react-native-seoul/kakao-login';



export default SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

  const getProfile = () => {

    KakaoLogins.getProfile()
      .then(result => {
        alert(result.id);
        fetch('http://127.0.0.1:8000/sign/up/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                kakaoId:result.id,
                email:email,
                password:password,
                name:name
            })
        })
        .then((response)=> response.json())
        .then((json)=>{
            navigation.goBack()
        })
        .catch((err)=>console.log(err))
      })
      .catch(err => console.log(err))
      
  };
   
    return (
        <View style={{
            justifyContent:'center',
            alignItems:'center'
        }}>
            <TextInput
            onChangeText = {text=>setEmail(text)}
            value={email}
            style={{
                width:250,
                height:50,
                marginTop:10
            }}
            placeholder="이메일"
            >
            </TextInput>
            <TextInput
            secureTextEntry={true}
            onChangeText ={text=>setPassword(text)}
            value={password}
            style={{
                width:250,
                height:50,
                marginTop:10
            }}
            placeholder="비밀번호"
            >
            </TextInput>
            <TextInput
            onChangeText={text=>setName(text)}
            value={name}
            style={{
                width:250,
                height:50,
                marginTop:10
            }}
            placeholder="이름"
            >
            </TextInput>
            <TouchableOpacity
            onPress={getProfile}>
                <Text>
                    회원가입
                </Text>
            </TouchableOpacity>
        </View>
    )

}
