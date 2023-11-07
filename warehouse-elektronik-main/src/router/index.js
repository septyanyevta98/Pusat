import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  Login,
  Home,
  Profile,
  History,
  ListItem,
  InputBrand,
  InputCategory,
  InputItem,
  DetailItem,
  EditItem,
  EditProfile,
  EditCategory,
  ChangePassword,
} from '../pages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components/molecules';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="List Item" component={ListItem} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditCategory"
        component={EditCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailItem"
        component={DetailItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItem}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InputBrand"
        component={InputBrand}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InputCategory"
        component={InputCategory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InputItem"
        component={InputItem}
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
};

export default Router;
