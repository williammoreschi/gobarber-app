import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px;
  padding-top: ${getStatusBarHeight() + 24}px;
  padding-bottom: ${Platform.OS === 'android' ? 15 : 40}px;
`;
export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;
export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 10px;
  flex: 1;
  align-items: center;
`;

export const UserAvatar = styled.View`
  width: 186px;
  height: 186px;
`;

export const UserIcon = styled.View`
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 50px;
  height: 50px;
  background: #ffffff;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
`;

export const UserAvatarImage = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 93px;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity``;
