import React, { Component } from 'react';
import { View } from 'react-native';
import Deck from './Deck';
import TouchButton from './TouchButton';
import { gray, textGray, blue, white } from '../utils/colors';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

export class DeckDetail extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  render() {
    const { deck } = this.props;

    return (
      <StyledView >
        <Deck id={deck.title} />
        <ButtonWrapperView>
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
            btnStyle={{ backgroundColor: blue, }}
            txtStyle={{ color: white }}
            onPress={() =>
              this.props.navigation.navigate('Quiz', { title: deck.title })
            }
          >
            Start Quiz
          </TouchButton>
        </ButtonWrapperView>
      </StyledView>
    );
  }
}


const StyledView = styled.View`
flex: 1;
padding: 16px;
background-color: ${gray};
justify-content: space-between;
`
const ButtonWrapperView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
`



const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

export default connect(
  mapStateToProps
)(DeckDetail);
