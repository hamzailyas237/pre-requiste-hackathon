

import { TextInput } from 'react-native'
import React from 'react'

const RoundedInput = ({ style, keyboardType, placeholder, onChangeText }) => {
    return (
        <TextInput
            style={style}
            keyboardType={keyboardType}
            placeholder={placeholder}
            onChangeText={onChangeText}
        />
    )
}

export default RoundedInput