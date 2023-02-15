

import 'react-native-gesture-handler';
import React from 'react'
import AppNavigation from './src/config/appNavigation/AppNavigation';
import { NativeBaseProvider } from "native-base";

const App = () => {
  return (
    <NativeBaseProvider>
      <AppNavigation />
    </NativeBaseProvider>
  )
}

export default App