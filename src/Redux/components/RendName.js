import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, AsyncStorage } from 'react-native';
import {connect} from 'react-redux';
import ActionCreators from '../actions';




class RendName extends Component {
  constructor(props, context){
    super(props, context);
  }
  
  render(){
    if(this.props.userToken){
      return(
        <View style={{ width: 120, height: 50, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 25}}>{this.props.userName}</Text>
        </View>
      )
    }
    else {
      return(
        <View style={{ width: 120, height: 50, flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <Text style={{fontSize: 25}}>{this.props.userName}</Text>
            <Button title="로그인" onPress={() => this.props.signIn()}></Button>
            <Button title="로그아웃" onPress={() => this.props.signOut()}></Button>
        </View>
      )
    }
  }
}

function mapStateToProps(state) {
    return {
        userName: state.userName,
        userToken: state.userToken
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signIn: () => {
            dispatch(ActionCreators.signIn());
            alert('ho');
        },
        signOut: () => {
        dispatch(ActionCreators.signOut());
        }
    };
}

  export default connect(mapStateToProps, mapDispatchToProps)(RendName);