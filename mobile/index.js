import * as ExpoModulesCore from 'expo-modules-core';

// Polyfill registerWebModule if missing in current expo-modules-core version
if (typeof ExpoModulesCore !== 'undefined' && !ExpoModulesCore.registerWebModule) {
  ExpoModulesCore.registerWebModule = function (factory, name) {
    try {
      return typeof factory === 'function' ? factory() : factory;
    } catch (e) {
      return {};
    }
  };
}

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
