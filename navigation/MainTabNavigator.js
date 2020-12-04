import React from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DeckList from '../components/DeckList';
import AddDeck from '../components/AddDeck';
import DeckDetail from '../components/DeckDetail';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';


import { white, blue, lightBlue } from '../utils/colors';


const routeConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={35} color={tintColor} />
    },

  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Feather name="plus-circle" size={35} color={tintColor} />
    }
  },

};


const tabNavigatorConfig = {
  navigationOptions: {
    headerShown: false
  },
  defaultNavigationOptions: {
    bounces: true
  },
  tabBarOptions: {
    showLabel: false,
    activeTintColor: blue,
    style: {
      height: 60,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      backgroundColor: white,
    },
    showIcon: true
  },
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig,);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        headerTintColor: blue,
        headerStyle: {
          backgroundColor: lightBlue,
        },
        title: 'Deck Details'
      }
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: blue,
        headerStyle: {
          backgroundColor: lightBlue
        },
        headerTitleStyle: {
          justifyContent: 'center',
          textAlign: 'center'
        },
        title: 'Add Card'
      }
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: blue,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: lightBlue,
        }
      }
    }
  }
);

export default MainNavigator;
