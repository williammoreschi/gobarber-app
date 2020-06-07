import styled, { css } from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface BackButtonProps {
  isVisible: boolean;
}

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;
export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 30px 0;
`;

export const BackToSignIn = styled.TouchableOpacity<BackButtonProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-top-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  ${(props) =>
    props.isVisible &&
    css`
      bottom: 100%;
    `}
`;

export const BackToSignInText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
