import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const Register = ({ navigation }) => {
  return (
    <View style={{ marginTop: 50 }}>
      <Text
        style={styles.credentialsText}>
        Register </Text>

      <TextInput
        style={styles.input}
        placeholder='Please enter username here..'
        placeholderTextColor="#9a73ef" />

      <TextInput
        style={styles.input}
        placeholder='Please enter password here..'
        placeholderTextColor="#9a73ef" />

      <TextInput
        style={styles.input}
        placeholder='Please repeat password here..'
        placeholderTextColor="#9a73ef" />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('Login')}>

        <Text style={styles.registerButtonText}> Register </Text>
      </TouchableOpacity>
    </View>
  );
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
