import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import { setLocalNotification } from './utils/helpers';
import styled from 'styled-components/native';
import { blue } from './utils/colors'
import { createAppContainer } from 'react-navigation';
import MainTabNavigator from './navigation/MainTabNavigator';
import StatusBar from './components/StatusBar';

const AppNavigator = createAppContainer(MainTabNavigator);


const store = createStore(
  reducer,
  applyMiddleware(thunk)
);


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={store}>
        <Wrapper >
          <StatusBar
            backgroundColor={blue}
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


