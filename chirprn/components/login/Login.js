import React, { Component } from 'react';
import { 
  View,
  Button,
  TextInput,
	StyleSheet,
	KeyboardAvoidingView,
} from 'react-native';
import Wallpaper from './Wallpaper';
import Form from './Form'
import usernameImg from 'res/username.png';
import passwordImg from 'res/password.png';

export default class Login extends Component {
 
  render() {
    return (
      <Wallpaper>
          <Form />
      </Wallpaper>
    );
  }
}