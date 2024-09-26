/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  ColorMode,
  extendTheme,
  NativeBaseProvider,
  StorageManager,
} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollablePage from './src/screens/Setting';
import {appTheme} from './src/theme';
import FacebookStyleTabs from './src/components/Tab';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
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
const tabs = ['Home', 'Friends', 'Marketplace', 'Watch'];
function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NativeBaseProvider
        colorModeManager={colorModeManager}
        theme={customTheme}>
        <NavigationContainer>
          <SafeAreaView>
            <FacebookStyleTabs tabs={tabs} />
            {/* <ScrollablePage /> */}
          </SafeAreaView>
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

export default App;
