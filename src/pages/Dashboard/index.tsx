import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth, } from '../../hooks/AuthContext';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProfileIcon } from './styles';

const Dashboard: React.FC = () => {
  const { signOut, user} = useAuth();
  const { navigate } = useNavigation();
  const navigateToProfile = useCallback(()=>{
    navigate('Profile');
  },[navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatar_url}} />
          <ProfileIcon>
            <Icon name="more-horizontal" size={14} color="#28262e" />
          </ProfileIcon>
        </ProfileButton>
      </Header>
    </Container>
  );
};

export default Dashboard;
