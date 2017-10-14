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

export default class Login extends Component {
 
  render() {
    return (
      <Wallpaper>
          <Form />
      </Wallpaper>
    );
  }
}