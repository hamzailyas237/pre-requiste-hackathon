

import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomScreen from '../bottomScreen/BottomScreen';
import Profile from '../profile/Profile';
import Location from '../location/Location';

const DrawerScreen = () => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Products"
                component={BottomScreen}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="Profile"
                component={Profile}
            />
            <Drawer.Screen
                name="Location"
                component={Location}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerScreen