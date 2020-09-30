import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/AuthContext';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fa9000" />
      </View>
    );
  }
  useEffect(() => {
    if (!loading) {
      SplashScreen.hide();
    }
  }, [loading]);
  return user ? <AppRoutes /> : <AuthRoutes />;
};
export default Routes;
