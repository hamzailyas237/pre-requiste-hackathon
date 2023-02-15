

import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { FormStyles } from '../../styles/Styles'
import axios from 'axios';
import Toast from 'react-native-toast-message';
import RoundedInput from '../../components/input/RoundedInput';


const Login = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [response, setResponse] = useState(false)

    const loginHandler = () => {

        const loginUserResponse = axios.post('https://ruby-long-salamander.cyclic.app/api/login', {
            email,
            password
        })
            .then(async (res) => {
                if (res.data.token) {
                    await AsyncStorage.setItem('token', res.data.token)
                    await AsyncStorage.setItem('id', res.data.user._id)
                    navigation.navigate('Splash')
                    setResponse(false)
                }
            })

            .catch(err => {
                setResponse(false)
                Toast.show({
                    type: 'error',
                    text1: err.response.data.message,
                    visibilityTime: 2000,
                    topOffset: 20
                });
            })

        const checkResponse = async () => {
            setResponse(true)
            await loginUserResponse
        }
        checkResponse()

    }

    return (
        <ScrollView>

            <View style={FormStyles.mainContainer}>

                <View style={FormStyles.appHeadingContainer}>
                    <Text style={FormStyles.appHeading}>Education App</Text>
                </View>


                <View style={[FormStyles.containerShadow, { width: '95%', }]}>

                    <View style={[FormStyles.inputContainer]}>
                        <Text style={FormStyles.mainHeading}>Login</Text>

                        <RoundedInput
                            style={[FormStyles.inputStyle, FormStyles.shadow]}
                            keyboardType="email-address"
                            placeholder='email@address.com'
                            onChangeText={(e) => setEmail(e)}
                        />
                        <RoundedInput
                            style={[FormStyles.inputStyle, FormStyles.shadow]}
                            secureTextEntry={true}
                            placeholder='Passowrd'
                            onChangeText={(e) => setPassword(e)}
                        />


                    </View>

                    <TouchableOpacity style={[FormStyles.buttonContainer, FormStyles.shadow]}
                        onPress={loginHandler}
                    >
                        <Text style={FormStyles.buttonStyle}>
                            {!response ?
                                'Login'
                                :
                                <ActivityIndicator color={'white'} />
                            }
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={{ textAlign: 'center' }}>
                            Don't have an account ?
                            <Text style={{ color: '#336CEF' }}> Sign up</Text>
                        </Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                        <View>
                            <Text style={{ width: 50, textAlign: 'center' }}>or</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: 15 }}>
                        <Image style={{ width: 40, height: 40 }} source={{ uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png ' }} />
                        <Image style={{ width: 30, height: 30 }} source={{ uri: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png' }} />
                    </View>
                </View>

            </View >
        </ScrollView>

    )
}

export default Login


