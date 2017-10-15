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
import Register from 'login/Register';
import Prompt from 'react-native-prompt';


var REQUEST_URL = 'https://chirp-app-saqlain.herokuapp.com/api/posts';
class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            helloStr: 'Hello, please log in to Chirp!',
            user: [],
            showAuth: true,
            chirpVisible: false,
        }
        this.setUser = this.setUser.bind(this);
    }

    setUser(userJson) {
        console.log(userJson);
        this.setState({
            helloStr: 'Hello ' + userJson.username,
            user: userJson,
            showAuth: false,
        });
    }
    static navigationOptions = {
        title: 'Chirp',
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.hello}>{this.state.helloStr}</Text>
                <Posts ref="posts" />
                {this._renderAuth()}
                {this._renderPrompt()}
            </View>
        );
    }

    _renderPrompt() {
        if (this.state.chirpVisible) {
            return (
                <Prompt
                    title="Chirp something"
                    placeholder="Meow meow"
                    visible={this.state.chirpVisible}
                    onCancel={() => this.setState({ chirpVisible: false })}
                    onSubmit={(value) => {
                        this.setState({ chirpVisible: false });
                        this._createChirp(value);
                    }} />
            )
        }
    }

    _createChirp(value: string) {
        console.log('this.state.user.username ' + this.state.user.username);
        if (this.state.user.username === 'hieunhu') {
            var body = 'text=' + value + '&created_by=' + this.state.user.username;
            var func = fetch(REQUEST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: body
            })
                .then((response) => response.json())
                .then((respJson) => {
                    if (respJson.created_by === this.state.user.username) {
                        alert('You have chirped successfully ' + respJson.created_by);
                        this.refs.posts._loadData();
                    }

                });
        }
    }

    _renderAuth() {
        if (this.state.showAuth) {
            const { navigate } = this.props.navigation;
            return (<View style={{
                marginBottom: 50,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Button
                    onPress={() => navigate('Login', { setUser: this.setUser.bind(this) })}
                    title="Login"
                />
                <Button
                    onPress={() => navigate('Register', { setUser: this.setUser.bind(this) })}
                    title="Register"
                />
            </View>)
        }
        else { // show Chirp & Logout
            return (<View style={{
                marginBottom: 50,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Button
                    onPress={() => this.setState({ chirpVisible: true })}
                    title="Chirp"
                />
                <Button
                    onPress={() => {
                        this.setState({ user: [], showAuth: true, helloStr: 'Hello, please log in to Chirp!' });
                    }}
                    title="Logout"
                />
            </View>)
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff'
    },
    hello:{
        margin: 20
    }
});


const ChirpApp = StackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: Login },
    Register: { screen: Register },
    Posts: { screen: Posts },
});
AppRegistry.registerComponent('chirprn', () => ChirpApp);