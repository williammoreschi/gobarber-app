import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => {
  return (
    <>
      <Container {...rest}>
        {!loading ? (
          <ButtonText>{children}</ButtonText>
        ) : (
          <ActivityIndicator size="small" color="#312e38" />
        )}
      </Container>
    </>
  );
};

export default Button;
