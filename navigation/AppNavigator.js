import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator.js';

export default createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
  })
);