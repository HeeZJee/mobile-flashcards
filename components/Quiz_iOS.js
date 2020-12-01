import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import TextButton from './TextButton';
import TouchButton from './TouchButton';
import { gray, green, red, textGray, darkGray, white } from '../utils/colors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import styled from 'styled-components/native'


const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};
const SCREEN_WIDTH = Dimensions.get('window').width;

class Quiz_iOS extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    deck: PropTypes.object.isRequired
  };
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.questions.length,
    answered: Array(this.props.deck.questions.length).fill(0)
  };
  handleScroll = () => {
    this.setState({
      show: screen.QUESTION
    });
  };
  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
      }),
      () => {
        const { correct, incorrect, questionCount } = this.state;

        if (questionCount === correct + incorrect) {
          this.setState({ show: screen.RESULT });
        } else {
          this.scrollView.scrollTo({ x: (page + 1) * SCREEN_WIDTH });
          this.setState(prevState => ({
            show: screen.QUESTION
          }));
        }
      }
    );
  };
  handleReset = () => {
    this.setState(prevState => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questionCount).fill(0)
    }));
  };
  render() {
    const { questions } = this.props.deck;
    const { show } = this.state;

    if (questions.length === 0) {
      return (
        <StyledView>
          <BlockView>
            <StyledCount style={{ textAlign: 'center' }}>
              You cannot take a quiz because there are no cards in the deck.
            </StyledCount>
            <StyledCount style={{ textAlign: 'center' }}>
              Please add some cards and try again.
            </StyledCount>
          </BlockView>
        </StyledView
        >
      );
    }

    if (this.state.show === screen.RESULT) {
      const { correct, questionCount } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

      return (
        <StyledView>
          <BlockView>
            <StyledCount style={{ textAlign: 'center' }}>
              Quiz Complete!
            </StyledCount>
            <Text style={resultStyle}>
              {correct} / {questionCount} correct
            </Text>
          </BlockView>
          <BlockView>
            <StyledCount style={{ textAlign: 'center' }}>
              Percentage correct
            </StyledCount>
            <Text style={resultStyle}>{percent}%</Text>
          </BlockView>
          <View>
            <TouchButton
              btnStyle={{ backgroundColor: green, borderColor: white }}
              onPress={this.handleReset}
            >
              Restart Quiz
            </TouchButton>
            <TouchButton
              btnStyle={{ backgroundColor: gray, borderColor: textGray }}
              txtStyle={{ color: textGray }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.goBack();
              }}
            >
              Back To Deck
            </TouchButton>
            <TouchButton
              btnStyle={{ backgroundColor: gray, borderColor: textGray }}
              txtStyle={{ color: textGray }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.navigate('Home');
              }}
            >
              Home
            </TouchButton>
          </View>
        </StyledView>
      );
    }

    return (
      <StyledScrollView
        pagingEnabled={true}
        horizontal={true}
        onMomentumScrollBegin={this.handleScroll}
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
      >
        {questions.map((question, idx) => (
          <StyledView key={idx}>
            <BlockView>
              <StyledCount>
                {idx + 1} / {questions.length}
              </StyledCount>
            </BlockView>
            <StlyedQuestionView>
              <StlyedQuestionText>
                {show === screen.QUESTION ? 'Question' : 'Answer'}
              </StlyedQuestionText>
              <StlyedQuestionWrapper>
                <StyledTittle>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </StyledTittle>
              </StlyedQuestionWrapper>
            </StlyedQuestionView>
            {show === screen.QUESTION ? (
              <TextButton
                txtStyle={{ color: red }}
                onPress={() => this.setState({ show: screen.ANSWER })}
              >
                Show Answer
              </TextButton>
            ) : (
                <TextButton
                  txtStyle={{ color: red }}
                  onPress={() => this.setState({ show: screen.QUESTION })}
                >
                  Show Question
                </TextButton>
              )}
            <View>
              <TouchButton
                btnStyle={{ backgroundColor: green, borderColor: white }}
                onPress={() => this.handleAnswer(answer.CORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                Correct
              </TouchButton>
              <TouchButton
                btnStyle={{ backgroundColor: red, borderColor: white }}
                onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                Incorrect
              </TouchButton>
            </View>
          </StyledView>
        ))}
      </StyledScrollView>
    );
  }
}


const StyledView = styled.View`
flex: 1;
padding: 16px;
background-color: ${gray};
justify-content: space-around;
width: ${SCREEN_WIDTH};
`

const BlockView = styled.View`
margin-bottom: 20px;
display: flex;
justify-content: center;
align-items: center;
`

const StlyedQuestionView = styled.View`
border-width: 1px;
border-color: ${darkGray};
background: ${white};
border-radius: 5px;
padding: 20px 16px;
flex-grow:1;
margin-bottom:20px;
`
const StlyedQuestionWrapper = styled.View`
flex: 1;
justify-content: center;
`

const StlyedQuestionText = styled.Text`
text-decoration: underline;
text-align: center;
font-size: 20px;
`

const StyledCount = styled.Text`
font-size: 24px;
`

const StyledTittle = styled.Text`
font-size: 32px;
text-align: center;
`
const StyledScrollView = styled.ScrollView`
flex: 1;
`


const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(Quiz_iOS));
