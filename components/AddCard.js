import React, { Component } from 'react';
import { View } from 'react-native';
import TouchButton from './TouchButton';
import { gray, blue } from '../utils/colors';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions/index';
import { addCardToDeckAS } from '../utils/api';
import styled from 'styled-components/native';



export class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  };
  handleQuestionChange = question => {
    this.setState({ question });
  };
  handleAnswerChange = answer => {
    this.setState({ answer });
  };
  handleSubmit = () => {
    const { addCardToDeck, title, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };
    const question = this.state.question
    const answer = this.state.answer

    addCardToDeck(title, question, answer);
    addCardToDeckAS(title, question, answer);

    this.setState({ question: '', answer: '' });
    navigation.goBack();
  };
  render() {
    return (
      <StyledView>
        <View>
          <BlockView>
            <StyledText>Add a question</StyledText>
          </BlockView>
          <BlockView>
            <StyledInput
              value={this.state.question}
              onChangeText={this.handleQuestionChange}
              placeholder="Question"
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => this.answerTextInput.focus()}
              blurOnSubmit={false}
            />
          </BlockView>
          <BlockView>
            <StyledInput
              value={this.state.answer}
              onChangeText={this.handleAnswerChange}
              placeholder="Answer"
              ref={input => {
                this.answerTextInput = input;
              }}
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
            />
          </BlockView>
          <TouchButton
            btnStyle={{ backgroundColor: blue, borderColor: '#fff' }}
            onPress={this.handleSubmit}
            disabled={this.state.question === '' || this.state.answer === ''}
          >
            Submit
          </TouchButton>
        </View>
        <View style={{ height: '30%' }} />
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

const BlockView = styled.View`
margin-bottom: 20px;
`

const StyledText = styled.Text`
font-size: 32px;
text-align: center;
`

const StyledInput = styled.TextInput`
border-width: 1px;
border-color: gray;
background-color: #fff;
padding: 0 10px;
border-radius: 5px;
font-size: 20px;
height: 40px;
`

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    title
  };
};

export default connect(
  mapStateToProps,
  { addCardToDeck }
)(AddCard);
