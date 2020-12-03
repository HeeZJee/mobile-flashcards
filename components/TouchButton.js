import React from 'react';
import { StyleSheet } from 'react-native';
import { white, darkGray, gray } from '../utils/colors';
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
width: 150px;
height: 50px;
background-color: 5px;
justify-content: center;
align-items: center;
border-width: 1px;
border-color: #999;
border-radius: 50px;
`

const StyledButtonText = styled.Text`
font-size: 18px;
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

