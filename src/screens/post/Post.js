
import { View, Text, Alert, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import AppDropdown from '../../components/dropdown/AppDropdown';
import AppButton from '../../components/button/AppButton';
import StandardInput from '../../components/input/StandardInput';
import { LinearProgress } from '@rneui/themed';
import { ActivityIndicator } from 'react-native';
import AppModal from '../../components/modal/AppModal';

const Post = () => {

  const [selected, setSelected] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imageStatus, setImageStatus] = useState(false);
  const [response, setResponse] = useState(false);

  const data = [
    { key: '1', value: "men's clothing" },
    { key: '2', value: "women's clothing" },
  ]

  const openCamera = async () => {
    launchCamera({ mediaType: 'photo' }, async (res) => {
      if (!res.didCancel) {
        // Uploading image to firebase Storage 
        const userId = await AsyncStorage.getItem('id')
        const fileUri = res.assets[0].uri
        const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1)
        const reference = storage().ref(`Images/Product Images/${userId}/${fileName}`)
        setImageStatus(true)
        await reference.putFile(fileUri)

        // Getting image from firebase Storage 
        const url = await reference.getDownloadURL();
        setImage(!res.didCancel && url)
      }
      setImageStatus(false)
    }
    )
  }

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo' }, async (res) => {

      if (!res.didCancel) {
        // Uploading image to firebase Storage 
        const userId = await AsyncStorage.getItem('id')
        const fileUri = res.assets[0].uri
        const fileName = fileUri.substring(fileUri.lastIndexOf('/') + 1)
        setImageStatus(true)
        const reference = storage().ref(`Images/Product Images/${userId}/${fileName}`)
        await reference.putFile(fileUri)
        // Getting image from firebase Storage 
        const url = await reference.getDownloadURL()
        setImage(!res.didCancel && url)
      }
      setImageStatus(false)
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


  const addToListing = async () => {
    const token = await AsyncStorage.getItem('token')

    const productObj = {
      title,
      description,
      price,
      category: selected,
      image
    }
    const createProductResp = axios.post('https://ruby-long-salamander.cyclic.app/api/products', productObj, {
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
      await createProductResp
      setResponse(false)
    }
    checkResponse()
  }

  return (

    <ScrollView>
      <View style={{ width: '80%', margin: 20 }}>

        <StandardInput
          placeholder='Enter title'
          onChangeText={(e) => setTitle(e)}
        />
        <StandardInput
          placeholder='Enter price'
          onChangeText={(e) => setPrice(e)}
          keyboardType="numeric"
        />

        <StandardInput
          placeholder='Enter description'
          onChangeText={(e) => setDescription(e)}
        />

        <AppDropdown
          data={data}
          boxStyles={{ borderWidth: 0, borderBottomWidth: 1, borderRadius: 0, width: '100%' }}
          inputStyles={{ fontSize: 17, color: 'black' }}
          setSelected={setSelected}
          placeholder="Select category"
        />


        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginTop: 15 }}
          onPress={uploadImage}
        >
          <Text>
            {!image ? 'Upload Image'
              :
              imageStatus ?
                // <ActivityIndicator />
                // <LinearProgress color="primary" style={{ width: 100 }} />
                'Uploading Image...'
                : 'Image Uploaded'}
          </Text>
          <Icon name="add-a-photo" size={25} />
        </TouchableOpacity>


        <TouchableOpacity>
          <AppButton
            onPress={addToListing}
            title={response ? <ActivityIndicator color={'white'} /> : 'ADD TO LISTING'}
            containerStyle={{
              width: '100%',
              marginTop: 20,
            }}
            buttonStyle={{ backgroundColor: '#499BFD' }}
          />
        </TouchableOpacity>
      </View>

    </ScrollView>

  )
}

export default Post


