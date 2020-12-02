import React, { Component } from 'react';
import { View } from 'react-native';
import Deck from './Deck';
import TouchButton from './TouchButton';
import TextButton from './TextButton';
import { gray, textGray, green, white, red } from '../utils/colors';
import { connect } from 'react-redux';
import { removeDeck } from '../actions/index';
import { removeDeckAS } from '../utils/api';
import styled from 'styled-components/native';

export class DeckDetail extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = id => {
    const { removeDeck, navigation } = this.props;

    removeDeck(id);
    removeDeckAS(id);

    navigation.goBack();
  };
  render() {
    const { deck } = this.props;

    return (
      <StyledView >
        <Deck id={deck.title} />
        <View>
          <TouchButton
            btnStyle={{ backgroundColor: white, borderColor: textGray }}
            txtStyle={{ color: textGray }}
            onPress={() =>
              this.props.navigation.navigate('AddCard', { title: deck.title })
            }
          >
            Add Card
          </TouchButton>
          <TouchButton
            btnStyle={{ backgroundColor: green, borderColor: white }}
            txtStyle={{ color: white }}
            onPress={() =>
              this.props.navigation.navigate('Quiz', { title: deck.title })
            }
          >
            Start Quiz
          </TouchButton>
        </View>
        <TextButton
          txtStyle={{ color: red }}
          onPress={() => this.handleDelete(deck.title)}
        >
          Delete Deck
        </TextButton>
      </StyledView>
    );
  }
}


const StyledView = styled.View`
flex: 1;
padding: 16px;
background-color: ${gray};

`

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

export default connect(
  mapStateToProps,
  { removeDeck }
)(DeckDetail);
