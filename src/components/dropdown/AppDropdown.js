

import { View, Text } from 'react-native'
import React from 'react'
import { SelectList } from 'react-native-dropdown-select-list'

const AppDropdown = ({ boxStyles, inputStyles, data, setSelected, placeholder }) => {
    return (
        <SelectList
            boxStyles={boxStyles}
            inputStyles={inputStyles}
            setSelected={setSelected} // built in prop
            data={data}
            save="value"
            placeholder={placeholder}
        />
    )
}

export default AppDropdown