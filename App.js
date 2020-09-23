import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from 'react-redux'
import configureStore from './redux/store'
const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
// import React from 'react';
// import { AppLoading } from 'expo';
// import { Container, Text } from 'native-base';
// import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
// import AppNavigator from './navigation/AppNavigator';

// import { Root } from "native-base";


// import { Provider } from 'react-redux'
// import configureStore from './redux/store'
// const store = configureStore()
// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isReady: false,
//     };
//   }

//   async componentDidMount() {
//     await Font.loadAsync({
//       Roboto: require('native-base/Fonts/Roboto.ttf'),
//       Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
//       ...Ionicons.font,
//     });
//     this.setState({ isReady: true });
//   }

//   render() {
//     if (!this.state.isReady) {
//       return <AppLoading />;
//     }

//     return (
//       <Provider store={store}>
//            <Root>
//            <AppNavigator />
//            </Root>
//        </Provider>
//     );
//   }
// }