import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { HelperText } from 'react-native-paper';
import { createUser } from '../realm_database/Database'

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      realm: null,
      username: '',
      password: '',
      repeatedPassword: '',
      showErrorOnUsernameValidation: false,
      showErrorOnPasswordValidation: false,
      showErrorOnPasswordRepeatValidation: false,
    }
  }

  validateUsername() {
    this.setState({ showErrorOnUsernameValidation: !this.isUsernameValid() })
  }

  validatePassword() {
    this.setState({ showErrorOnPasswordValidation: !this.isPasswordValid() })
  }

  validateRepeatedPassword() {
    this.setState({ showErrorOnPasswordRepeatValidation: !this.isRepeatedPasswordValid() })
  }

  isUsernameValid() {
    const username = this.state.username

    return username.length >= 6 && username.length <= 18
  }

  isPasswordValid() {
    const password = this.state.password

    return password.length >= 6 && password.length <= 24 && (new RegExp('[0-9]')).test(password) // Must contain atleast óne number
  }

  isRepeatedPasswordValid() {
    const { password, repeatedPassword } = this.state

    if (password == '') { // Don't validate if first password-input is empty
      return true
    }
    return password === repeatedPassword
  }

  hasAnyEmptyFields() {
    const { username, password, repeatedPassword } = this.state

    if (username.trim() === '' || password.trim() === '' || repeatedPassword.trim() === '') {
      return true
    }
    return false
  }

  hasAnyValidationError() {
    return !this.isUsernameValid() || !this.isPasswordValid() || !this.isRepeatedPasswordValid()
  }

  onPressRegister() {
    if (this.hasAnyEmptyFields()) {
      alert("All fields must be filled!")
    } else if (this.hasAnyValidationError()) {
      return // return nothing - fields will show error
    } else {
      createUser(this.state.username, this.state.password)

      alert("You are now registered!")

      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <View>

        <Text
          style={styles.credentialsText}>
          Register your account </Text>

        <View>
          <TextInput
            style={styles.input}
            placeholder='Please enter username here..'
            placeholderTextColor="#9a73ef"
            onChangeText={(inputUser) => this.setState({ username: inputUser })} />

          <HelperText
            style={styles.helperText}
            type="error"
            visible={this.state.showErrorOnUsernameValidation}>
            * Username must be between 6 and 18 characters</HelperText>
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder='Please enter password here..'
            placeholderTextColor="#9a73ef"
            onChangeText={(inputPassword) => this.setState({ password: inputPassword })} />

          <HelperText
            style={styles.helperText}
            type="error"
            visible={this.state.showErrorOnPasswordValidation}>
            * Password must be between 6 and 24 characters {"\n"} 
            * Must contain a number from 0 to 9</HelperText>
        </View>

        <View>
          <TextInput
            style={styles.input}
            placeholder='Please repeat password here..'
            placeholderTextColor="#9a73ef"
            onChangeText={(inputRepeatedPassword) => this.setState({ repeatedPassword: inputRepeatedPassword })} />

          <HelperText
            style={styles.helperText}
            type="error"
            visible={this.state.showErrorOnPasswordRepeatValidation}>
            Passwords doesn't match!</HelperText>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            this.validateUsername()
            this.validatePassword()
            this.validateRepeatedPassword()
            this.onPressRegister()
          }} >

          <Text style={styles.registerButtonText}> Register now </Text>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  credentialsText: {
    margin: 15,
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30,
    color: 'black'
  },
  input: {
    margin: 15,
    marginBottom: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  registerButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  registerButtonText: {
    color: 'white'
  },
  registerText: {
    textAlign: 'center',
    color: '#7a42f4',
    fontSize: 15,
  },
  helperText: {
    marginTop: -20,
    marginLeft: 3.5,
  },
});

export default Register;
