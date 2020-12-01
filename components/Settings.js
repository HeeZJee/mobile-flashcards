import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { gray, white, red, textGray, green } from '../utils/colors';
import TouchButton from './TouchButton';
import { resetDecks } from '../utils/api.js';
import { connect } from 'react-redux';
import { resetStore } from '../actions/index';
import styled from 'styled-components/native'


export class Settings extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    resetStore: PropTypes.func.isRequired
  };
  handleResetDecks = () => {
    const { resetStore, navigation } = this.props;

    resetStore();
    resetDecks();
    navigation.goBack();
  };
  render() {
    return (
      <StlyedView>
        <StyledTittle> Settings </StyledTittle>
        <BlockView>
          <BlockContainerView>
            <StyledText>
              This will reset the data back to the original data set.
            </StyledText>
            <View style={{ height: 20 }} />
            <TouchButton
              btnStyle={{ backgroundColor: red, borderColor: white }}
              onPress={this.handleResetDecks}
            >
              Reset Data
            </TouchButton>
          </BlockContainerView>
        </BlockView>
      </StlyedView>
    );
  }
}

const StlyedView = styled.View`
flex: 1;
padding: 16px;
background-color: ${gray};
`

const StyledTittle = styled.Text`
font-size: 40px;
text-align: center;
margin-bottom: 16px;
color: ${green};
`
const StyledText = styled.Text`
font-size: 18px;
color: ${textGray};
`

const BlockView = styled.View`
margin-bottom: 20px;
`
const BlockContainerView = styled.View`
border-width: 1px;
border-color: #aaa;
background-color: ${white};
border-radius: 5px;
padding: 20px 20px 0 20px;
`

export default connect(
  null,
  { resetStore }
)(Settings);
