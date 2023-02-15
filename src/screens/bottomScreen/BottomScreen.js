

import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../home/Home';
import Post from '../post/Post';
import Wishlist from '../wishlist/Wishlist';
import Cart from '../cart/Cart';

const BottomScreen = () => {

    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            // I you remove tint color, by default primary color will be applied 
            tabBarActiveTintColor: '#499BFD',
            // tabBarActiveBackgroundColor:'black'
        }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name="Post"
                component={Post}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="add-box" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name="Wishlist"
                component={Wishlist}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="favorite" color={color} size={size} />)
                }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="shopping-cart" color={color} size={size} />)
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomScreen