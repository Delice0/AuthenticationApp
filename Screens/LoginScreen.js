import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { doesUserExist } from '../realm_database/DatabaseServices'

const Login = ({ navigation }) => {

    const [toggleRememberMe, setRememberMe] = React.useState(false)
    const [inputUsername, setUsername] = React.useState('')
    const [inputPassword, setPassword] = React.useState('')

    const onPressSubmit = () => {
        if (doesUserExist(inputUsername, inputPassword)) {
            navigation.navigate('Home')
            alert("Welcome " + inputUsername + "!")
        } else {
            alert("User does not exists!")
        }
    }

    return (
        <View style={{ marginTop: 50 }}>
            <Text
                style={styles.credentialsText}>
                Credentials </Text>

            <TextInput
                style={styles.input}
                placeholder='Please enter username here..'
                placeholderTextColor="#9a73ef"
                onChangeText={(input) => setUsername(input)} />

            <TextInput
                style={styles.input}
                placeholder='Please enter password here..'
                placeholderTextColor="#9a73ef"
                onChangeText={(input) => setPassword(input)} />

            <View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 1 }}>
                    <CheckBox
                        style={{ justifyContent: 'flex-end', marginLeft: 10 }}
                        disabled={false}
                        value={toggleRememberMe}
                        onValueChange={(toggle) => setRememberMe(toggle)}>
                    </CheckBox>
                </View>

                <View style={{ flex: 7, marginTop: 6 }}>
                    <Text
                        style={styles.rememberMeText}
                    > Remember me</Text>
                </View>

            </View>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => onPressSubmit()}>

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
});

export default Login;