/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {
  ColorMode,
  extendTheme,
  NativeBaseProvider,
  StorageManager,
} from 'native-base';
import React from 'react';
import AppStack from './src/navigation';
import { appTheme } from './src/theme';
import { AppProvider } from './src/context';
// Define the colorModeManager,
// here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'light';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

const customTheme = extendTheme(appTheme);

function App(): React.JSX.Element {
  return (
    <NativeBaseProvider
      colorModeManager={colorModeManager}
      theme={customTheme}>
      <NavigationContainer>
        <AppProvider>
          <AppStack />
        </AppProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
