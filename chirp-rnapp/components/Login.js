import React, { Component } from 'react';
import { 
  View,
  Button,
  TextInput,
	StyleSheet,
	KeyboardAvoidingView,
} from 'react-native';
import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this._onPress = this._onPress.bind(this);
    this.state = { 
      username: "",
      password: "",
      color: "#ff0000"
     };
  }

  _onPress() {
   if  (this.state.color === "#ff0000") 
    this.state.color = "#841584";
   else
    this.state.color = "#ff0000";
   this.forceUpdate();
  }

  render() {
    return (
      <View style={{padding: 10}}>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(username) => this.setState({username})}
      />

      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        secureTextEntry={true}
        onChangeText={(password) => this.setState({password})}
      />
      <Button
      onPress={this._onPress}
  title="Learn More"
  color={this.state.color}
  accessibilityLabel="Learn more about this purple button"
/>
        
      </View>
    );
  }
}