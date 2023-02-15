import Icon from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from "@rneui/themed";
import { AspectRatio, Box, Center, Heading, HStack, Stack, Text } from "native-base";
import { useState } from "react";
import { Image } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../button/AppButton';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';


export const ProductCard = ({ product, detail, wishlist, wishlistProducts, cart, cartProducts }) => {
    const [cartProductToDeleteId, setCartProductToDeleteId] = useState('')

    const [checked, setState] = useState(true);
    const toggleCheckbox = () => setState(!checked);
    const navigation = useNavigation();

    const goToProductDetail = () => {
        navigation.navigate('ProductDetail', product)
    }

    const addToWishlist = async () => {
        toggleCheckbox()
        const user_id = await AsyncStorage.getItem('id')
        const token = await AsyncStorage.getItem('token')

        axios.post('https://ruby-long-salamander.cyclic.app/api/wishlist', { product, user_id }, {
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

    const [wishlistProductToDeleteId, setWishlistProductToDeleteId] = useState('')
    const removeFromWishlist = async () => {
        wishlistProducts.map((data, i) => {
            if (product._id === data.product._id) {
                setWishlistProductToDeleteId(data._id)
            }
        })
        await axios.delete(`https://ruby-long-salamander.cyclic.app/api/wishlist/${wishlistProductToDeleteId}`)
            .then(res => {
                Toast.show({
                    type: 'success',
                    text1: res.data.message,
                    visibilityTime: 2000,
                    topOffset: 20
                });
            })
            .catch(err => {
                // console.log(err);
                // Toast.show({
                //     type: 'error',
                //     text1: err.response.data.message,
                //     visibilityTime: 2000,
                //     topOffset: 20
                // });
            })
    }


    const addToCart = async () => {
        const user_id = await AsyncStorage.getItem('id')
        const token = await AsyncStorage.getItem('token')

        axios.post('https://ruby-long-salamander.cyclic.app/api/cart', { product, user_id }, {
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


    const removeFromCart = async () => {
        const token = await AsyncStorage.getItem('token')

        cartProducts.map((data, i) => {
            if (product._id === data.product._id) {
                setCartProductToDeleteId(data._id)
            }
        })

        await axios.delete(`https://ruby-long-salamander.cyclic.app/api/cart/${cartProductToDeleteId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
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
                // console.log(err);
                // Toast.show({
                //     type: 'error',
                //     text1: err.response.data.message,
                //     visibilityTime: 2000,
                //     topOffset: 20
                // });
            })
    }

    const checkout = () => {
        navigation.navigate('Checkout', product)
    }

    return <Box alignItems="center">
        <Box maxW="80" m={5} rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1"
            _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
            }} _web={{
                shadow: 2,
                borderWidth: 0
            }} _light={{
                backgroundColor: "gray.50"
            }}>

            {cart ?
                <Icon
                    style={{ position: 'absolute', right: 0, zIndex: 1 }}
                    onPress={removeFromCart}
                    name='cancel' size={25}
                />
                :
                null
            }

            <Box>
                <AspectRatio w="100%" ratio={16 / 9}>
                    <Image resizeMode='contain' source={{
                        uri: product.image
                    }} alt="image" />
                </AspectRatio>
            </Box>

            <Stack p={4} space={1}>
                <Stack flexDirection={'row'} justifyContent={'space-between'}>
                    <Stack space={2}>
                        <Heading size="md" ml="-1">
                            {product.title}
                        </Heading>
                        <Text fontSize="xs" _light={{
                            color: "#499BFD"
                        }} _dark={{
                            color: "#499BFD"
                        }} fontWeight="500" ml="-0.5" mt="-1">
                            {product.category}
                        </Text>
                    </Stack>

                    <CheckBox
                        checked={checked}
                        checkedIcon={
                            <Icon
                                backgroundColor="transparent"
                                onPress={wishlist ? removeFromWishlist : addToWishlist}
                                name="favorite" size={30} color={wishlist ? 'red' : null} />
                        }
                        uncheckedIcon={
                            <Icon
                                name="favorite" size={30} color="red" />
                        }
                        checkedColor="red"
                    />
                </Stack>

                <Text fontWeight="500">
                    {product.price} $
                </Text>

                {!detail ?
                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <AppButton
                            onPress={goToProductDetail} title={'View Detail'}
                            containerStyle={{
                                width: '50%',
                            }}
                            buttonStyle={{ backgroundColor: '#499BFD', borderRadius: 100, alignItems: 'center' }}
                        />
                    </TouchableOpacity>
                    :
                    null
                }

                {detail ?
                    <Stack>
                        <Text fontWeight="400">
                            {product.description}
                        </Text>

                        <Stack flexDirection='row' justifyContent="center" mt={3}>

                            <TouchableOpacity onPress={checkout}>
                                <AppButton
                                    title={'Buy now'}
                                    onPress={checkout}
                                    containerStyle={{
                                        width: '100%',
                                        margin: 2
                                    }}
                                    buttonStyle={{ backgroundColor: '#499BFD', width: 130, borderRadius: 100, }}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={addToCart}>
                                <AppButton
                                    title={'Add to cart'}
                                    onPress={addToCart}
                                    containerStyle={{
                                        width: '100%',
                                        margin: 2
                                    }}
                                    buttonStyle={{ backgroundColor: '#499BFD', width: 130, borderRadius: 100, }}
                                />
                            </TouchableOpacity>
                        </Stack>

                    </Stack>
                    :
                    null
                }



                {/* <HStack alignItems="center" space={4} justifyContent="space-between">
                    <HStack alignItems="center">
                        <Text color="coolGray.600" _dark={{
                            color: "warmGray.200"
                        }} fontWeight="400">
                            6 mins ago
                        </Text>
                    </HStack>
                </HStack> */}
            </Stack>
        </Box>
    </Box >
};