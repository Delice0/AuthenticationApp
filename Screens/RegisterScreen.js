import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { CreateUser } from '../realm_database/DatabaseServices'

class Register extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      realm: null,
      id: 0,
      username: '',
      password: '',
      repeatedPassword: '',
      isValidPassword: false,
    }
  }

  validateCredentials(username, firstPass, secondPass) {
    if ((firstPass || secondPass || username) === '') {
      return false
    }
    return firstPass === secondPass
  }

  render() {
    return (
      <View style={{ marginTop: 50 }}>

        <Text
          style={styles.credentialsText}>
          Register your account </Text>

        <TextInput
          style={styles.input}
          placeholder='Please enter username here..'
          placeholderTextColor="#9a73ef"
          onChangeText={(inputUser) => this.setState({ username: inputUser })} />

        <TextInput
          style={styles.input}
          placeholder='Please enter password here..'
          placeholderTextColor="#9a73ef"
          onChangeText={(inputPassword) => this.setState({ password: inputPassword })} />

        <TextInput
          style={styles.input}
          placeholder='Please repeat password here..'
          placeholderTextColor="#9a73ef"
          onChangeText={(inputRepeatedPassword) => this.setState({ repeatedPassword: inputRepeatedPassword })} />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => {
            if (this.validateCredentials(this.state.username, this.state.password, this.state.repeatedPassword)) {
              CreateUser(this.state.id, this.state.username, this.state.password)

              alert("You are now registered!")

              this.props.navigation.goBack()
            } else {
              alert("Passwords doesn't match!")
            }
          }} >

          <Text style={styles.registerButtonText}> Register </Text>

        </TouchableOpacity>
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
    fontSize: 30,
    marginBottom: 30
  },
  input: {
    margin: 15,
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
});

export default Register;
