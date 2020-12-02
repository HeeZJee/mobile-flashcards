import React from 'react';
import { View } from 'react-native';
import { white, textGray } from '../utils/colors';
import { connect } from 'react-redux';
import styled from 'styled-components/native'


const Deck = props => {
  const { deck } = props;

  if (deck === undefined) {
    return <StyledDeckView />;
  }
  return (
    <StyledDeckView>
      <View>
        <StyledDecText>{deck.title}</StyledDecText>
      </View>
      <View>
        <StyledCardText>{deck.questions.length} cards</StyledCardText>
      </View>
    </StyledDeckView>
  );
};


const StyledDeckView = styled.View`
align-items: center;
justify-content: center;
flex-basis: 120px;
min-height: 120px;
border-width: 1px;
background-color: ${white};
border-color: #aaa;
margin-bottom: 10px;
`

const StyledDecText = styled.Text`
font-size: 28px;

`
const StyledCardText = styled.Text`
font-size: 18px;
color: ${textGray}
`


const mapStateToProps = (state, { id }) => {
  const deck = state[id];

  return {
    deck
  };
};

export default connect(mapStateToProps)(Deck);
