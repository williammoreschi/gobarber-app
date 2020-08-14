import styled from 'styled-components/native';
import { shade } from 'polished';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { IProvider } from './index';

export const Container = styled.View`
  flex: 1;
`;

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

export const Header = styled.View`
  padding: 24px;
  background: #28262e;
  padding-top: ${getStatusBarHeight() + 24}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #f5efe8;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: #efefef;
  margin-left: auto;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<IProvider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  background: ${(props) => (props.selected ? '#ff9000' : '#28262e')};
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
  margin-right: 16px;
  border-radius: 10px;
`;
export const ProviderAvatar = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: ${shade(0.3, '#efefef')};
`;
export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-size: 16px;
  font-family: 'RobotoSlab-Medium';
`;

export const Calendar = styled.View``;

export const CalendarTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #f4efe8;
  font-size: 24px;
  margin: 0 24px 24px 24px;
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9900;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;
export const OpenDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #232129;
  font-size: 24px;
`;
