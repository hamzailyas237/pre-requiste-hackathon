

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from '@rneui/themed';

const AppButton = ({ onPress, title, containerStyle, buttonStyle }) => {
    return (
        <Button
            onPress={onPress}
            title={title}
            containerStyle={containerStyle}
            buttonStyle={buttonStyle}
        />
    )
}

export default AppButton