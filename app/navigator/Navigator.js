import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import RootStack from '../../src/router'
import SearchScreen from '../../src/components/Search'
import RegisterScreen from '../../src/components/Register'
import LoginScreen from '../../src/components/Login'

import { Platform } from 'react-native'
import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
/*
const IOS_MODAL_ROUTES = ["OptionsScreen"];

let dynamicModalTransition = (
  transitionProps: NavigationTransitionProps,
  prevTransitionProps: NavigationTransitionProps
): TransitionConfig => {
  return StackViewTransitionConfigs.defaultTransitionConfig(
    transitionProps,
    prevTransitionProps,
    IOS_MODAL_ROUTES.some(
      screenName =>
        screenName === transitionProps.scene.route.routeName ||
        (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)
    )
  );
};
*/

const HomeStack = RootStack

HomeStack.navigationOptions = {
  tabBarLabel: 'Food',
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Icon name='ios-restaurant' type='ionicon' color={tintColor} />
  ),
  drawerLabel: 'Home',
  drawerIcon: ({ tintColor }: TabScene) => (
    <Icon name='md-restaurant' type='ionicon' color={tintColor} />
  )
}

const SearchStack = createStackNavigator({ SearchScreen })

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Icon name='ios-search' type='ionicon' color={tintColor} />
  ),
  drawerLabel: 'Search',
  drawerIcon: ({ tintColor }: TabScene) => (
    <Icon name='md-search' type='ionicon' color={tintColor} />
  )
}

const AccountStack = createStackNavigator({ LoginScreen, RegisterScreen })

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ tintColor }: TabScene) => (
    <Icon name='md-person' type='ionicon' color={tintColor} />
  ),
  drawerLabel: 'Settings',
  drawerIcon: ({ tintColor }: TabScene) => (
    <Icon name='md-person' type='ionicon' color={tintColor} />
  )
}
/*
const MainNavigator = Platform.select({
    ios: createBottomTabNavigator({ HomeStack, SettingsStack }),
    //android: createBottomTabNavigator({ HomeStack, SettingsStack }, {contentComponent: BurgerMenu})
    android: createBottomTabNavigator({ HomeStack, SettingsStack, RootStack })
});
*/

const RootSwitch = Platform.select({
  ios: createBottomTabNavigator({ HomeStack, SearchStack, AccountStack }),
  // android: createBottomTabNavigator({ HomeStack, SettingsStack }, {contentComponent: BurgerMenu})
  android: createBottomTabNavigator(
    { HomeStack, SearchStack, AccountStack },
    {
      // tabBarComponent: TabBar,
      tabBarOptions: {
        activeTintColor: '#F98C00',
        inactiveTintColor: '#777'
      }
    }
  )
})
/*
const RootSwitch = createSwitchNavigator(
    { LoadingScreen, MainNavigator },
    { initialRouteName: "LoadingScreen" }
); */

const AppContainer = createAppContainer(RootSwitch)
export default AppContainer
