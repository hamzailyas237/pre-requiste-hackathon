import React, { Component } from 'react'
import { Text, View, Image, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = {
    container: {
        flex: 1,
        marginBottom: 30,
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    }
}

export default AppSwiper = ({ swiperImages }) => {
    return (
        <View style={styles.container}>
            <Swiper autoplay
                autoplayTimeout={5}
                height={200}

                dot={
                    <View
                        style={{
                            backgroundColor: 'rgba(0,0,0,.2)',
                            width: 5,
                            height: 5,
                            borderRadius: 4,
                            margin: 3
                        }}
                    />
                }
                activeDot={
                    <View
                        style={{
                            backgroundColor: '#499BFD',
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3
                        }}
                    />
                }
                paginationStyle={{
                    bottom: -23,
                    left: null,
                    right: 10
                }}
                loop
            >

                {
                    swiperImages.map((img, i) => {
                        return <View key={i} style={styles.slide}>
                            <Image
                                resizeMode="stretch"
                                style={styles.image}
                                source={img}
                            />
                        </View>
                    })
                }
            </Swiper>
        </View >
    )
}
