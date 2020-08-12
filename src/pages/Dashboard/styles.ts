import styled from 'styled-components/native';
import { shade } from 'polished';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { IProvider } from './index';

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
`;
export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #efefef;
`;

export const ProfileIcon = styled.View`
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 20px;
  height: 20px;
  background: #ffffff;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  padding: 32px 24px 16px 24px;
`;
export const ProvidersListTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  margin-bottom: 24px;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background: ${shade(0.3, '#efefef')};
`;

export const ProviderInfo = styled.View`
  margin-left: 20px;
  flex: 1;
`;

export const ProviderName = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #f4ede8;
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
`;
