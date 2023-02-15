

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../../styles/Styles';

const Splash = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('DrawerScreen')
        }, 2000);
    })
    return (
        <View style={styles.splashContainer}>
            <Text style={styles.splashText}>Splash</Text>
        </View>
    )
}

export default Splash