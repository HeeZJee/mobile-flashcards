import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { textGray, white, darkGray, gray } from '../utils/colors';
import styled from 'styled-components/native'


export default function TouchButton({
  children,
  onPress,
  btnStyle = {},
  txtStyle = {},
  disabled = false
}) {
  const disabledButton = disabled ? styles.btnDisabled : {};
  const disabledButtonText = disabled ? styles.btnTextDisabled : {};
  return (
    <StyledView>
      <StyledButton
        style={[btnStyle, disabledButton]}
        onPress={onPress}
        disabled={disabled}
      >
        <StyledButtonText
          style={[
            txtStyle,
            disabledButtonText
          ]}
        >
          {children}
        </StyledButtonText>
      </StyledButton>
    </StyledView>
  );
}

const StyledView = styled.View`
align-items: center;
margin-bottom: 20px;
`

const StyledButton = styled.TouchableOpacity`
width: 200px;
height: 50px;
background-color: 5px;
justify-content: center;
align-items: center;
border-width: 1px;
border-color: #999;
`

const StyledButtonText = styled.Text`
font-size: 20px;
font-weight: bold;
color: ${white};
`


const styles = StyleSheet.create({
  btnDisabled: {
    backgroundColor: gray,
    borderColor: darkGray
  },
  btnTextDisabled: {
    color: darkGray
  }
});

TouchButton.propTypes = {
  children: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  btnStyle: PropTypes.object,
  txtStyle: PropTypes.object,
  disabled: PropTypes.bool
};
