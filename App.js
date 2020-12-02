import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import Constants from 'expo-constants';
import AppNavigator from './navigation/AppNavigator';
import { setLocalNotification } from './utils/helpers';
import styled from 'styled-components/native';
import { green } from './utils/colors'

const store = createStore(
  reducer,
  applyMiddleware(thunk, logger)
);

function FlashcardStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <Wrapper >
          <FlashcardStatusBar
            backgroundColor={green}
            barStyle="light-content"
          />
          <AppNavigator styled />
        </Wrapper>
      </Provider>
    );
  }
}

const Wrapper = styled.View`
    flex: 1;
    background-color: #dde;
`