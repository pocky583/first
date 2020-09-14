import AsyncStorage from '@react-native-community/async-storage';

const storeData = async (value) => {
    try{
        await AsyncStorage.setItem('accessToken', value)
        console.log('토큰 저장됨')
    } catch (err){
        console.log(err)
    }
}

const getData = async() => {
    try{
        const value = await AsyncStorage.getItem('accessToken')
        if(value !== null){
            alert(`${value},토큰이 저장되어 있음. 로그인됨`)
        }
    } catch(err){
        console.log(err)
    }
}

export {storeData, getData};