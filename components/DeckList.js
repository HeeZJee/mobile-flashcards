import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import Deck from './Deck';
import { gray, green } from '../utils/colors';
import { handleInitialData } from '../actions/index';
import styled from 'styled-components/native';


export class DeckList extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    handleInitialData: PropTypes.func.isRequired,
    decks: PropTypes.object.isRequired
  };
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const { decks, navigation } = this.props;

    return (
      <StyledScrollView >
        <StyledText>Mobile Flashcards</StyledText>
        {Object.values(decks).map(deck => {
          return (
            <TouchableOpacity
              key={deck.title}
              onPress={() =>
                navigation.navigate('DeckDetail', { title: deck.title })
              }
            >
              <Deck id={deck.title} />
            </TouchableOpacity>
          );
        })}
        <View style={{ marginBottom: 30 }} />
      </StyledScrollView>
    );
  }
}
const StyledScrollView = styled.ScrollView`
flex: 1;
padding: 16px;
background-color: ${gray};
`
const StyledText = styled.Text`
font-size: 40px;
text-align: center;
margin-bottom: 16px;
color: ${green};
`


const mapStateToProps = state => ({ decks: state });

export default connect(
  mapStateToProps,
  { handleInitialData }
)(DeckList);
