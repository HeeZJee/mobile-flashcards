import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import TouchButton from './TouchButton';
import { gray, green, white, textGray } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions/index';
import { saveDeckTitleAS } from '../utils/api';
import { StackActions, NavigationActions } from 'react-navigation';
import styled from 'styled-components/native'


export class AddDeck extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    addDeck: PropTypes.func.isRequired
  };
  state = {
    text: ''
  };
  handleChange = text => {
    this.setState({ text });
  };
  handleSubmit = () => {
    const { addDeck, navigation } = this.props;
    const { text } = this.state;

    addDeck(text);
    saveDeckTitleAS(text);

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckDetail',
          params: { title: text }
        })
      ]
    });
    navigation.dispatch(resetAction);

    this.setState(() => ({ text: '' }));
  };
  render() {
    return (
      <StyledView>
        <View style={{ height: 60 }} />
        <BlockView>
          <StyledText>What is the title of your new deck?</StyledText>
        </BlockView>
        <BlockView>
          <StyledTextInput
            value={this.state.text}
            onChangeText={this.handleChange}
            placeholder="Deck Name"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={this.handleSubmit}
          />
        </BlockView>
        <TouchButton
          btnStyle={{ backgroundColor: green, borderColor: white }}
          onPress={this.handleSubmit}
          disabled={this.state.text === ''}
        >
          Create Deck
        </TouchButton>
      </StyledView>
    );
  }
}

const StyledView = styled.View`
flex: 1;
padding: 16px;
background-color: ${gray};

`

const BlockView = styled.View`
margin-bottom: 20px;
`

const StyledText = styled.Text`
text-align: center;
font-size: 32px;
`

const StyledTextInput = styled.TextInput`
border: 1px;
border-color: ${textGray};
background-color: white;
padding: 5px 10px;
border-radius: 5px;
font-size: 20px;
margin-bottom: 20px;
`


export default connect(
  null,
  { addDeck }
)(AddDeck);
