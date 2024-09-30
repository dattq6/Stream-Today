import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CommonHeader from "../components/Header";
import HomeScreen from '../screens/Home';
import DrawerContent from './DrawerContent';

const Drawer = createDrawerNavigator();

function AppDrawer() {
	return (
		<Drawer.Navigator
			drawerContent={props => <DrawerContent {...props} />}
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: '#f4511e',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				header: () => <CommonHeader />
			}}
		>
			<Drawer.Screen
				name="HomeScreen"
				component={HomeScreen}
				options={{ title: "Home Page" }}
			/>
		</Drawer.Navigator>

	);
}

export default AppDrawer;