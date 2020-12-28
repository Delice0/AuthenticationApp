import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const Login = ({ navigation }) => {
    return (
        <View style={{ marginTop: 50 }}>
            <Text
                style={styles.credentialsText}>
                Credentials </Text>

            <TextInput
                style={styles.input}
                placeholder='Please enter username here..'
                placeholderTextColor="#9a73ef" />

            <TextInput
                style={styles.input}
                placeholder='Please enter password here..'
                placeholderTextColor="#9a73ef" />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => navigation.navigate('Home')}>

                <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>

            <Text
                style={styles.registerText}
                onPress={() => navigation.navigate('Register')}>
                Don't have an account? Register here!
            </Text>
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
});

export default Login;