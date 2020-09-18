import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';

import React, {Component} from 'react';
import { Text, Platform, StyleSheet, View, Alert, Image } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-navigation';


import { Ionicons } from '@expo/vector-icons';
var Global = require('./assets/styles/global');

import AppNavigator from './navigation/AppNavigator';// Old
var UserAPI = require('./clientAPI/users');
var LocalAPI = require('./clientAPI/local');
import {connect} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


import {store, persistor} from './redux'
import { Provider } from 'react-redux'

import AccessCodeGate from './components/AccessCodeGate'

const strictTheme = { ['text-font-family']: 'work-sans-regular' }; // <-- Your Font
const customMapping = { strict: strictTheme };


export class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            isLoadingComplete: false,
            showAccessGate: true,
            showLoginGate: true
        };

        this.loadResourcesAsync = this.loadResourcesAsync.bind(this);
        this.handleLoadingError = this.handleLoadingError.bind(this);
        this.handleFinishLoading = this.handleFinishLoading.bind(this);

        this._handleSetupGatePassed = this._handleSetupGatePassed.bind(this);
    };


    async loadResourcesAsync() {
      await Promise.all([
        Asset.loadAsync([
          require('./assets/images/robot-dev.png'),
          require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
          // This is the font that we are using for our tab bar (unused, keeping syntax -MJ)
          ...Ionicons.font,
          'work-sans-regular': require('./assets/fonts/WorkSans-Regular.ttf'),
          'work-sans-bold': require('./assets/fonts/WorkSans-Bold.ttf'),
          'work-sans-light': require('./assets/fonts/WorkSans-Light.ttf'),
          'work-sans-medium': require('./assets/fonts/WorkSans-Medium.ttf'),
          'work-sans-semibold': require('./assets/fonts/WorkSans-SemiBold.ttf'),
          'work-sans-thin': require('./assets/fonts/WorkSans-Thin.ttf'),
        }),
      ]);

      let readyToOpenApp = await LocalAPI.startupSequence();
      this.setState({showAccessGate: readyToOpenApp.showAccessGate, showLoginGate: readyToOpenApp.showLoginGate})
      if (readyToOpenApp.APIFailure){
        Alert.alert("Can't connect to HAA. Try reconnecting to internet and restart the app.")
      }

    }

    _handleSetupGatePassed(){
        this.setState({showAccessGate: false})
    }

    // In this case, you might want to report the error to your error reporting service
    handleLoadingError(error) {
      console.warn(error);
    }

    handleFinishLoading() {
      this.setState({isLoadingComplete: true})
    }

  // const [isLoadingComplete, setLoadingComplete] = useState(false);

    render(){
        return(
            <Provider store={store}>
              <PersistGate 
                    persistor={persistor} 
                    loading={null}
              >
                <SafeAreaProvider>
                        { !this.state.isLoadingComplete ?
                            <AppLoading
                              startAsync={this.loadResourcesAsync}
                              onError={this.handleLoadingError}
                              onFinish={this.handleFinishLoading}
                            /> :

                            <SafeAreaView  forceInset={{bottom:'never', top:'never'}} style={styles.container}>
                              {this.state.showAccessGate ?
                                <AccessCodeGate _handleSetupGatePassed= {this._handleSetupGatePassed}/>
                                :<AppNavigator/>
                              }
                            </SafeAreaView>
                        }
                </SafeAreaProvider>
              </PersistGate>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
});

export default App;
