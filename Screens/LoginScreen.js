import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { HelperText } from 'react-native-paper';
import { doesUserExist } from '../realm_database/DatabaseServices'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRememberMeToggled: false,
            inputUsername: '',
            inputPassword: '',
            showErrorOnUsernameValidation: false,
            showErrorOnPasswordValidation: false,
        }
    }

    isUsernameInputFieldEmpty() {
        return this.state.inputUsername.trim() === ''
    }

    isPasswordInputFieldEmpty() {
        return this.state.inputPassword.trim() === ''
    }

    validateUsernameInputField() {
        this.setState({ showErrorOnUsernameValidation: this.isUsernameInputFieldEmpty() })
    }

    validatePasswordInputField() {
        this.setState({ showErrorOnPasswordValidation: this.isPasswordInputFieldEmpty() })
    }

    showErrorIfUsernameNotValid() {
        return <HelperText
            style={styles.helperText}
            type="error"
            visible={this.state.showErrorOnUsernameValidation}>
            Username cannot be empty! </HelperText>
    }

    showErrorIfPasswordNotValid() {
        return <HelperText
            style={styles.helperText}
            type="error"
            visible={this.state.showErrorOnPasswordValidation}>
            Password cannot be empty! </HelperText>
    }

    onPressSubmit() {
        const { inputUsername, inputPassword } = this.state

        if (this.isUsernameInputFieldEmpty() || this.isPasswordInputFieldEmpty()) {
            alert("Please fill both username and password!")
        } else if (doesUserExist(inputUsername, inputPassword)) {
            this.props.navigation.navigate('Home')
            alert("Welcome " + inputUsername + "!")
        } else {
            alert("User does not exists!")
        }
    }

    render() {
        return (
            <View style={{ marginTop: 50 }}>
                <Text
                    style={styles.credentialsText}>
                    Credentials </Text>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Please enter username here..'
                        placeholderTextColor="#9a73ef"
                        onChangeText={(input) => this.setState({ inputUsername: input })} />

                    {this.showErrorIfUsernameNotValid()}
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Please enter password here..'
                        placeholderTextColor="#9a73ef"
                        onChangeText={(input) => this.setState({ inputPassword: input })} />

                    {this.showErrorIfPasswordNotValid()}
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            style={{ justifyContent: 'flex-end', marginLeft: 10 }}
                            disabled={false}
                            value={this.state.isRememberMeToggled}
                            onValueChange={(value) => this.setState({ isRememberMeToggled: value })} >
                        </CheckBox>
                    </View>

                    <View style={{ flex: 7, marginTop: 6 }}>
                        <Text
                            style={styles.rememberMeText}
                        > Remember me</Text>
                    </View>
                </View>

                <View>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => {
                            this.validateUsernameInputField()
                            this.validatePasswordInputField()
                            this.onPressSubmit()
                        }}>

                        <Text style={styles.submitButtonText}> Submit </Text>
                    </TouchableOpacity>
                </View>

                <Text
                    style={styles.registerText}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    Don't have an account? Register here! </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    credentialsText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 30,
        marginBottom: 30
    },
    input: {
        margin: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1
    },
    rememberMeText: {
        justifyContent: 'flex-start',
        color: '#7a42f4'
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText: {
        color: 'white'
    },
    registerText: {
        textAlign: 'center',
        color: '#7a42f4',
    },
    helperText: {
        marginTop: -20,
        marginLeft: 3.5,
    },
});

export default Login;