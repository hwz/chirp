import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    AppRegistry,
    Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Posts from './components/Posts';
import Login from 'login/Login';

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>Hello, Chat App!</Text>
                <Button
                    onPress={() => navigate('Chat')}
                    title="Chat with Lucy"
                />
                <Posts />
                {/* <Button
                    onPress={() => navigate('Posts')}
                    title="See list of Chirps"
                /> */}
                <Button
                    onPress={() => navigate('Login')}
                    title="Login"
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
});

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

const ChirpApp = StackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: Login },
    Posts: { screen: Posts },
    Chat: { screen: ChatScreen },
});
AppRegistry.registerComponent('chirprn', () => ChirpApp);