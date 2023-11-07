import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  Login,
  Home,
  Pegawai,
  LogActivity,
  AddPegawai,
  DetailPenjualan,
  Warehouse,
  EditPegawai,
  Store,
  ChangePassword,
  Kredit,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components/molecules';
import {NavigationContainer} from '@react-navigation/native';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Kredit" component={Kredit} />
      <Tab.Screen name="History" component={LogActivity} />
      <Tab.Screen name="Pegawai" component={Pegawai} />
    </Tab.Navigator>
  );
};

function StackScreen() {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Kredit"
        component={Kredit}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Pegawai"
        component={Pegawai}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Store"
        component={Store}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPegawai"
        component={AddPegawai}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailPenjualan"
        component={DetailPenjualan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Warehouse"
        component={Warehouse}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditPegawai"
        component={EditPegawai}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogActivity"
        component={LogActivity}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
const Router = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
  );
};

export default Router;
