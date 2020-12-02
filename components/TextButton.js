import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'

export default function TextButton({ children, onPress, txtStyle = {} }) {
  return (
    <StyledView>
      <TouchableOpacity onPress={onPress}>
        <StyledButtonText style={txtStyle}>{children}</StyledButtonText>
      </TouchableOpacity>
    </StyledView>
  );
}


const StyledView = styled.View`
align-items: center;
margin-bottom: 20px;
`

const StyledButtonText = styled.Text`
font-size: 20px;
`