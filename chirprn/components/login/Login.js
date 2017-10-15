import React, { Component } from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Wallpaper from './Wallpaper';
import Form from './Form';
import { NavigationActions } from 'react-navigation'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      action: [],
    }
    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(userJson){    
    const { params} = this.props.navigation.state;
    params.setUser(userJson);
    // this.state.action(userJson);
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  }


  render() {
    
    return (
      <Wallpaper>
        <Form title="Login" onSuccess={this.onSuccess} />
      </Wallpaper>
    );
  }
}