import React, {useState} from 'react';
import { Text, View, Button, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import KakaoLogins from '@react-native-seoul/kakao-login';
import SignUpScreen from './SignUpScreen';
import {storeData, getData} from '../AddOn/Async'
import ActionCreators from '../Redux/actions';
import {useSelector, useDispatch} from 'react-redux'


function HomeScreen({navigation}) {

    const [loginLoading, setLoginLoading] = useState(false);     
    const [logoutLoading, setLogoutLoading] = useState(false);
    const [profileLoading, setProfileLoading] = useState(false);
    const [unlinkLoading, setUnlinkLoading] = useState(false);
    const [token, setToken] = useState(TOKEN_EMPTY);
    const [profile, setProfile] = useState(PROFILE_EMPTY);
    const [idText, onChangeId] = useState(''); //로그인 아이디 입력
    const [pwText, onChangePw] = useState(''); //로그인 패스워드 입력


    if (!KakaoLogins){
        console.error('Module is Not Linked');
    }

    const logCallback = (log, callback) => {
        console.log(log);
        callback;
        };
    const TOKEN_EMPTY = 'token has not fetched';

    const PROFILE_EMPTY = {
        id: 'profile has not fetched',
        email: 'profile has not fetched',
        profile_image_url: '',
    };
    

    //카카오톡 회원가입 함수
    const signUpKakao = () => {
        
        logCallback('Starting Register',setLoginLoading(true));

        KakaoLogins.login() //카카오톡 로그인창
        .then(result => {
            logCallback(
                `Login Finished:${JSON.stringify(result)}`,
                setLoginLoading(false),
            );
        })
        .then(getProfile) //카카오톡 아이디 중복확인 함수 실행
        .catch(err => {
            if (err.code === 'E_CANCELLED_OPERATION') {
            logCallback(`Login Cancelled:${err.message}`, setLoginLoading(false));
            } else {
            logCallback(
                `Login Failed:${err.code} ${err.message}`,
                setLoginLoading(false),
            );
            }
        });
    }

    //카카오톡 아이디 중복확인 함수
    const getProfile = () => {
        logCallback('Get Profile Start', setProfileLoading(true));
    
        KakaoLogins.getProfile()
        .then(result => {
            setProfile(result);
            //서버에서 중복검사
            fetch('http://127.0.0.1:8000/sign/check/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    kakaoId : JSON.stringify(result.id)
                })
            })
            .then((response)=> response.json())
            .then((json)=>{
                if(JSON.stringify(json.isSuccess)=='"true"'){
                    navigation.navigate('Signup') //성공 시 다음 화면 진행
                    alert("성공")
                    }
                    //실패 시 로그인 화면 유지
                    else if(JSON.stringify(json.isSuccess)=='"false"'){
                    alert(JSON.stringify(json.isSuccess))
                    alert("카카오 아이디로 가입된 계정 있음")
                    }
            })
            .catch((err)=>console.log(err))
            logCallback(
                `Get Profile Finished:${JSON.stringify(result)}`,
                setProfileLoading(false),
            );
            })
        .catch(err => {
        logCallback(
            `Get Profile Failed:${err.code} ${err.message}`,
            setProfileLoading(false),
        );
        });
    };
    
    //로그아웃
    const unlinkKakao = () => {
    logCallback('Unlink Start', setUnlinkLoading(true));
    
    KakaoLogins.unlink()
        .then(result => {
        setToken(TOKEN_EMPTY); //토큰 제거
        setProfile(PROFILE_EMPTY); //프로필 제거
        logCallback(`Unlink Finished:${result}`, setUnlinkLoading(false));
        })
        .catch(err => {
        logCallback(
            `Unlink Failed:${err.code} ${err.message}`,
            setUnlinkLoading(false),
        );
        });
    };

    //redux hook
    const mytoken = useSelector(state => state.userToken)
    const username = useSelector(state => state.userName)

    const dispatch = useDispatch()

    return (
        <View style={{ flex: 1}}>
            <View style={{flex:15, alignItems: 'center', justifyContent: 'center' }}>

                {/*아이디 입력칸*/}
                <View> 
                    <TextInput
                        style={{ height: 40,width: 200, borderColor: 'gray', borderBottomWidth: 0.8, marginBottom:20, backgroundColor:'#fffafa' }}
                        onChangeText={text=>onChangeId(text)}
                        value={idText}
                        placeholder="  아이디"
                    >
                    </TextInput>
                </View>

                {/*비밀번호 입력칸*/}
                <View> 
                    <TextInput
                        style={{ height: 40,width: 200, borderColor: 'gray', borderBottomWidth: 0.8, backgroundColor:'#fffafa' }}
                        onChangeText={text=>onChangePw(text)}
                        value={pwText}
                        secureTextEntry={true}
                        placeholder="  비밀번호"
                    >
                    </TextInput>
                </View>
                
                {/*로그인 버튼*/}
                <TouchableOpacity style={{marginTop:40}} onPress={()=>{
            fetch('http://127.0.0.1:8000/sign/in/',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    email:idText,
                    password:pwText
                })
            })
            .then((response)=> response.json())
            .then((json)=>{
                alert(JSON.stringify(json))
                if(json.loginSuccess === "true"){
                    navigation.goBack()
                    storeData(json.accessToken) //토큰 저장
                    alert(json.accessToken)
                    dispatch(ActionCreators.signIn())
                    dispatch(ActionCreators.getToken())
                } else {
                    alert(JSON.stringify(json.message))
                }
            })
            .catch((err)=>console.log(err));
            }}> 
                    <View style={{height:50,width:130, backgroundColor:'#fffacd', justifyContent:'center', alignItems:'center'}}>
                        <Text>로그인</Text>
                    </View>
                </TouchableOpacity>
            </View>

            
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center', flexDirection:'row'}}>
                <View>
                    <TouchableOpacity> 
                        <Text>아이디 찾기</Text>
                    </TouchableOpacity>
                </View>
                <Text>    /    </Text>
                <View>
                    <TouchableOpacity> 
                        <Text>비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:5, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity  onPress={signUpKakao}> 
                    <View style={{backgroundColor:'#f0e68c', width:300, height:40, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>카카오톡으로 회원가입</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity  onPress={unlinkKakao}> 
                    <View style={{backgroundColor:'#f0e68c', width:300, height:40, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>임시 로그아웃</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

 

const Stack = createStackNavigator();

export function LoginScreen(){
  return (
    <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen}/>
    </Stack.Navigator>
  );
}
