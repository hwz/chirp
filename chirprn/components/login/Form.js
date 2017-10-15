import React, { Component, PropTypes } from 'react';
import UserInput from './UserInput';
import Dimensions from 'Dimensions';

import usernameImg from 'res/username.png';
import passwordImg from 'res/password.png';

import {
    StyleSheet,
    Image,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,
    TouchableOpacity,
} from 'react-native';

var REQUEST_URL = 'https://chirp-app-saqlain.herokuapp.com/auth/';

export default class Form extends Component {
    constructor(props) {
        super(props);
        this._onPress = this._onPress.bind(this);
        this.state = {
            username: "hieunhu",
            password: "123456",
            color: "#ff0000",
        };
    }

    _onPress() {
        // if (this.state.color === "#ff0000")
        //     this.state.color = "#841584";
        // else
        //     this.state.color = "#ff0000";

        if (this.props.title === "Login") {
            this._loginOrRegister(true);
        }
        else if (this.props.title === "Register") {
            this._loginOrRegister(false);
        }


        this.forceUpdate();
    }

    _loginOrRegister(login: boolean) {


        var params = {
            'username': this.state.username,
            'password': this.state.password,
            // 'grant_type': 'password'
        };
        var formBody = [];
        for (var property in params) {
            var encodedKey = (property);
            var encodedValue = (params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        var formData = new FormData();

        console.log("formBody " + formBody);
        console.log("url " + REQUEST_URL + (login ? "login" : "signup"));
        
        var func = fetch(REQUEST_URL + (login ? "login" : "signup"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
            .then((response) => response.json())
            .then((respJson) => {
                // this.props.action(responseJson);

        console.log(respJson);
                if(respJson.state === 'success'){
                    if(!login)
                        alert('You have registered successfully, please login!');
                    this.props.onSuccess(respJson.user);
                }
                else{
                    alert(respJson.message);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        return func;

    }

    render() {
        return (

            <KeyboardAvoidingView behavior='padding'
                style={styles.container}>
                {/* <TextInput
                    style={{ width: DEVICE_WIDTH - 40, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                    onChangeText={(username) => this.setState({ username })}
                /> */}

                <UserInput source={usernameImg}
                    placeholder='Username'
                    autoCapitalize={'none'}
                    value={this.state.username}
                    returnKeyType={'done'}
                    onChangeText={(username) => this.setState({ username })}
                    autoCorrect={false} />
                <UserInput source={passwordImg}
                    secureTextEntry={true}
                    placeholder='Password'
                    value={this.state.password}
                    returnKeyType={'done'}
                    autoCapitalize={'none'}
                    onChangeText={(password) => this.setState({ password })}
                    autoCorrect={false} />
                {
                /* <TextInput
                    style={{ width: DEVICE_WIDTH - 40, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                /> */}
                <Button
                    onPress={this._onPress}
                    title={this.props.title}
                    color={this.state.color}
                    accessibilityLabel="Learn more about this purple button"
                />

            </KeyboardAvoidingView>);
    }
}

Form.propTypes = {
    title: PropTypes.string.isRequired,
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    btnEye: {
        position: 'absolute',
        top: 55,
        right: 28,
    },
    iconEye: {
        width: 25,
        height: 25,
        tintColor: 'rgba(0,0,0,0.2)',
    },
});