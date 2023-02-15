
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';


const Profile = () => {

    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [createdOn, setCreatedOn] = useState('')
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const getUserData = async () => {
            const userId = await AsyncStorage.getItem('id')
            await axios.get(`https://ruby-long-salamander.cyclic.app/api/profile/${userId}`)
                .then(res => {
                    setImage(res.data.profile_data.image)
                    setLoader(false)
                })
                .catch(err => {
                    console.log(err);
                })
            await axios.get(`https://ruby-long-salamander.cyclic.app/api/user/${userId}`)
                .then(res => {
                    setName(res.data.user.name)
                    setEmail(res.data.user.email)
                    setPhone(res.data.user.phone)
                    setCreatedOn(res.data.user.created_on)
                    setLoader(false)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getUserData()
    }, [])

    const openCamera = async () => {
        const userId = await AsyncStorage.getItem('id')
        const token = await AsyncStorage.getItem('token')

        launchCamera({ mediaType: 'photo' }, async (res) => {
            // Uploading image to firebase Storage
            if (res) {
                const fileUri = res.assets[0].uri
                const fileName = fileUri.substring(image.lastIndexOf('/') + 1)
                const reference = storage().ref(`Images/Profile Images/${userId}/${fileName}`)
                await reference.putFile(fileUri)

                // Getting image from firebase Storage 
                const url = await reference.getDownloadURL();
                setImage(!res.didCancel && url)

                // Pushing gotten image from firebase Storage to server 
                const obj = {
                    user_id: userId,
                    image: url
                }

                await axios.post('https://ruby-long-salamander.cyclic.app/api/profile', obj, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(res => {
                        Toast.show({
                            type: 'success',
                            text1: res.data.message,
                            visibilityTime: 2000,
                            topOffset: 20
                        });
                    })
                    .catch(err => {
                        Toast.show({
                            type: 'error',
                            text1: err.response.data.message,
                            visibilityTime: 2000,
                            topOffset: 20
                        });
                    })
            }
        })
    }

    const openGallery = async () => {
        const userId = await AsyncStorage.getItem('id')
        const token = await AsyncStorage.getItem('token')

        launchImageLibrary({ mediaType: 'photo' }, async (res) => {
            // Uploading image to firebase Storage
            if (res) {
                const fileUri = res.assets[0].uri
                const fileName = fileUri.substring(image.lastIndexOf('/') + 1)
                const reference = storage().ref(`Images/Profile Images/${userId}/${fileName}`)
                await reference.putFile(fileUri)

                // Getting image from firebase Storage 
                const url = await reference.getDownloadURL();
                setImage(!res.didCancel && url)

                // Pushing gotten image from firebase Storage to server 
                const obj = {
                    user_id: userId,
                    image: url
                }

                await axios.post('https://ruby-long-salamander.cyclic.app/api/profile', obj, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                })
                    .then(res => {
                        Toast.show({
                            type: 'success',
                            text1: res.data.message,
                            visibilityTime: 2000,
                            topOffset: 20
                        });
                    })
                    .catch(err => {
                        Toast.show({
                            type: 'error',
                            text1: err.response.data.message,
                            visibilityTime: 2000,
                            topOffset: 20
                        });
                    })
            }
        })
    }


    let uploadImage = () => {
        Alert.alert('Upload Image', 'Take a photo or select from gallery', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
            },
            { text: 'Photo', onPress: openCamera },
            { text: 'Gallery', onPress: openGallery },
        ]
        )
    }
    return (


        <View style={{ flex: 1, marginTop: 20 }}>

            {loader ? <ActivityIndicator size="large" style={{ marginTop: 10 }} />
                :
                <View>
                    <TouchableOpacity onPress={uploadImage} style={{ alignItems: 'center' }}>
                        <Image
                            style={{ height: 150, width: 150, borderRadius: 100 }}
                            resizeMode="contain"
                            source={{
                                uri: image ? image : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{ alignItems: 'center', marginTop: 20, gap: 10 }}>
                        <Text style={{ fontSize: 22 }}> {name ? name : 'name'}</Text>
                        <Text>Email: {email ? email : 'email'}</Text>
                        <Text>Phone: {phone ? phone : 'email'}</Text>
                        <Text>Created on: {createdOn ? createdOn.split("T")[0] : 'createdOn'}</Text>
                    </View>
                </View>

            }
        </View >




    )
}

export default Profile
