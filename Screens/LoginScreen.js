import AsyncStorage from '@react-native-async-storage/async-storage';
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
            rememberMe: false,
            username: '',
            password: '',
            showErrorOnUsernameValidation: false,
            showErrorOnPasswordValidation: false,
        }
    }

    componentDidMount() {
        // Simple listener that executes everytime this 'Login'-screen get in focus
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            try {
                if (this.state.rememberMe) {
                    const user = await this.getRememberedUser()
                    const username = user[0]
                    const password = user[1]

                    this.setState({
                        username: username,
                        password: password,
                        rememberMe: true
                    })
                } else {
                    // Delete user from AsyncStorage and clear username + password
                    console.log("Removing user from storage..")
                    this.forgetUser()

                    console.log("Clearing user credential states..")
                    this.setState({
                        username: '',
                        password: '',
                        rememberMe: false
                    })
                }
            } catch (error) {
                console.log("Could not fetch remembered user \n" + error)
            }
        })
    }

    componentWillUnmount() {
        // Remove listener when component unmounts
        this._unsubscribe()
    }

    async rememberUser() {
        try {
            console.log("Adding user to storage..")
            await AsyncStorage.setItem("USER", this.state.username)
            await AsyncStorage.setItem("PASS", this.state.password)
        } catch (error) {
            console.error("Could not save user: " + error)
        }
    }

    async getRememberedUser() {
        try {
            const username = await AsyncStorage.getItem("USER")
            const password = await AsyncStorage.getItem("PASS")

            console.log("Remembered user from storage: \nUsername: " + username + "\nPassword: " + password)
            if (username !== null && password !== null) {
                return [username, password]
            }
        } catch (error) {
            console.log("Could not fetch username nor password: " + error)
        }
    }

    async forgetUser() {
        try {
            console.log("Removing user from storage..")

            await AsyncStorage.removeItem("USER")
            await AsyncStorage.removeItem("PASS")
        } catch (error) {
            console.log("Could not remove user: " + error)
        }
    }

    toggleRememberMe(value) {
        console.log("Remember me toggled. Value is: " + value)

        this.setState({ rememberMe: value })
        value ? this.rememberUser() : this.forgetUser()
    }

    isUsernameInputFieldEmpty() {
        return this.state.username.trim() === ''
    }

    isPasswordInputFieldEmpty() {
        return this.state.password.trim() === ''
    }

    validateUsernameInputField() {
        this.setState({ showErrorOnUsernameValidation: this.isUsernameInputFieldEmpty() })
    }

    validatePasswordInputField() {
        this.setState({ showErrorOnPasswordValidation: this.isPasswordInputFieldEmpty() })
    }

    onPressSubmit() {
        const { username, password } = this.state

        console.log("Submit button pressed. Validating fields before logging in..")
        if (this.isUsernameInputFieldEmpty() || this.isPasswordInputFieldEmpty()) {
            console.log("Failed login validation")

            alert("Please fill both username and password!")
        } else if (doesUserExist(username, password)) {
            console.log("Login validation succeeded! Navigating to home page..")

            this.props.navigation.navigate('Home')

            alert("Welcome " + username + "!")
        } else {
            console.log("Failed login validation. User does not exist!")

            alert("User does not exists!")
        }
    }

    render() {
        return (
            <View style={{ marginTop: 50 }}>
                <Text style={styles.credentialsText}> Credentials </Text>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Please enter username here..'
                        placeholderTextColor="#9a73ef"
                        value={this.state.username}
                        onChangeText={(input) => this.setState({ username: input })} />

                    <HelperText
                        style={styles.helperText}
                        type="error"
                        visible={this.state.showErrorOnUsernameValidation}>
                        Username cannot be empty! </HelperText>
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder='Please enter password here..'
                        placeholderTextColor="#9a73ef"
                        value={this.state.password}
                        onChangeText={(input) => this.setState({ password: input })} />

                    <HelperText
                        style={styles.helperText}
                        type="error"
                        visible={this.state.showErrorOnPasswordValidation}>
                        Password cannot be empty! </HelperText>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <CheckBox
                            style={{ justifyContent: 'flex-end', marginLeft: 10 }}
                            disabled={false}
                            value={this.state.rememberMe}
                            onValueChange={(value) => this.toggleRememberMe(value)} >
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