import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Box, Button, ScrollView, Text, useColorMode, useColorModeValue, useTheme } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import NewsScreen from '../screens/News';

function HomeScreen() {
    return (
        <Box h={300} flex={1} bg={"amber.700"} >
            <ScrollView bg={"blue.700"}>
                <Text>Home Screen</Text>
            </ScrollView>
        </Box>
    );
}

function ProfileScreen() {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue('Light', 'Dark');
    const bg = useColorModeValue('warmGray.50', 'coolGray.800');
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Profile Screen</Text>
            <Text fontSize="lg" display="flex" mb={20}>
                The active color mode is{' '}
                <Text bold fontSize="18px">
                    {text}
                </Text>
            </Text>
            <Button onPress={toggleColorMode} h={10}>
                Toggle
            </Button>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

function TopTabs() {
    const theme = useTheme();
    const bodyColor = useColorModeValue(theme.colors.blueGray[100], theme.colors.blueGray[800]);
    const activeTabBgColor = useColorModeValue(theme.colors.primary[800], theme.colors.blueGray[200]);
    const activeTabTextColor = useColorModeValue(theme.colors.primary[800], theme.colors.blueGray[200]);
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
                tabBarStyle: { backgroundColor: bodyColor },
                tabBarIndicatorStyle: { backgroundColor: activeTabBgColor },
                tabBarActiveTintColor: activeTabTextColor,
            }}
        >
            <Tab.Screen name="News" component={NewsScreen} />
            <Tab.Screen name="Live" component={ProfileScreen} />
            <Tab.Screen name="Standing" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

export default TopTabs;
