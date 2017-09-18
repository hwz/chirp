import React from 'react';
import {
    View,
    Button,
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Movies from './Movies';
import Login from './components/Login';

class HomeScreen extends React.Component {
    static navigationOptions = {
      title: 'Welcome',
    };
    render() {
      const { navigate } = this.props.navigation;
      return (
        <View>
          <Text>Hello, Chat App!</Text>
          <Button
            onPress={() => navigate('Chat')}
            title="Chat with Lucy"
          />

          <Button
            onPress={() => navigate('Movies')}
            title="See list of Chirps"
          />
          <Button
            onPress={() => navigate('Login')}
            title="Login"
          />
        </View>
      );
    }
  }


class ChatScreen extends React.Component {
    static navigationOptions = {
      title: 'Chat with Lucy',
    };
    render() {
      return (
        <View>
          <Text>Chat with Lucy</Text>
        </View>
      );
    }
  }

  const SimpleApp = StackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: Login },
    Movies: { screen: Movies },
    Chat: { screen: ChatScreen },
  });
AppRegistry.registerComponent('SimpleApp', () => SimpleApp);