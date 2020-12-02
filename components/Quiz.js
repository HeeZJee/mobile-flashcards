import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quiz_UI from './Quiz_UI';
import { setLocalNotification, clearLocalNotification } from '../utils/helpers';

export class Quiz extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', '');
    return {
      title: `${title} Quiz`
    };
  };
  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }
  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');


    return <Quiz_UI title={title} />;
  }
}

export default Quiz;
