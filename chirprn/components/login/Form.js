import React, { Component, PropTypes } from 'react';

import Dimensions from 'Dimensions';
import {
    StyleSheet,
    Image,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView,

} from 'react-native';

export default class Form extends Component {
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
        if (this.state.color === "#ff0000")
            this.state.color = "#841584";
        else
            this.state.color = "#ff0000";
        this.forceUpdate();
    }

    render() {
        return (

            <KeyboardAvoidingView behavior='padding'
                style={styles.container}>
                <TextInput
                    style={{ width: DEVICE_WIDTH - 40, height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(username) => this.setState({ username })}
                />

                <TextInput
                    style={{ width: DEVICE_WIDTH - 40, height: 40, borderColor: 'gray', borderWidth: 1 }}
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <Button
                    onPress={this._onPress}
                    title="Learn More"
                    color={this.state.color}
                    accessibilityLabel="Learn more about this purple button"
                />

            </KeyboardAvoidingView>);
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
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