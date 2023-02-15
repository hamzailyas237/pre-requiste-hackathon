
import { View, Text } from 'react-native'
import React from 'react'
import { Input } from '@rneui/themed';

const StandardInput = ({ placeholder, onChangeText }) => {
    return (
        <Input
            placeholder={placeholder}
            onChangeText={onChangeText}
        />
    )
}

export default StandardInput