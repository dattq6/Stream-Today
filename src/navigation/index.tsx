import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorModeValue, useTheme } from "native-base";
import SettingScreen from "../screens/Setting";
import WebViewScreen from "../screens/WebViewScreen";
import AppDrawer from "./Drawer";


const Stack = createNativeStackNavigator();
const baseOptions = {
    headerTitleStyle: {
        fontWeight: 'bold',
    },
}

const AppStack = () => {
    const theme = useTheme();
    const bodyColor = useColorModeValue(theme.colors.blueGray[100], theme.colors.blueGray[800]);
    const textColor = useColorModeValue(theme.colors.gray[800], theme.colors.gray[200]);
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={AppDrawer} options={{ headerShown: false }} />
            <Stack.Screen name="Setting" component={SettingScreen} options={{
                title: 'Setting',
                headerStyle: {
                    backgroundColor: bodyColor,
                },
                headerTintColor: textColor,
                ...baseOptions
            }} />
            <Stack.Screen name="WebView" component={WebViewScreen} options={({ route }) => ({
                title: route.params?.title || 'Detail',
                headerStyle: {
                    backgroundColor: bodyColor,
                },
                headerTintColor: textColor,
                ...baseOptions
            })} />
        </Stack.Navigator>
    );
}

export default AppStack;