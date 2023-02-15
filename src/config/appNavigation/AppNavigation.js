


import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../../screens/signup/Signup';
import Login from '../../screens/login/Login';
import Splash from '../../screens/splash/Splash';
import DrawerScreen from '../../screens/drawerScreen/DrawerScreen';
import Toast from 'react-native-toast-message'
import ProductDetail from '../../screens/productDetail/ProductDetail';
import BottomScreen from '../../screens/bottomScreen/BottomScreen';
import { Checkout } from '../../screens/checkout/Checkout';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Signup" component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Splash" component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="DrawerScreen" component={DrawerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="BottomScreen" component={BottomScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ProductDetail" component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Checkout" component={Checkout}
        />

      </Stack.Navigator>





      <Toast />

    </NavigationContainer>
  );
}

export default AppNavigation;