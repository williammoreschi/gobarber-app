import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import ImageEditor from '@react-native-community/image-editor';

import { useAuth } from '../../hooks/AuthContext';

import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  BackButton,
  Title,
  UserAvatarButton,
  UserAvatar,
  UserAvatarImage,
  UserIcon,
} from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}
const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const handleProfile = useCallback(
    async (data: ProfileFormData) => {
      setLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when(
            'old_password',
            (oldPassword: string, field: any) =>
              oldPassword
                ? field.required().min(6, 'No mínimo 6 caracteres')
                : field,
          ),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo Obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')], 'As senhas devem corresponder'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const formData = {
          name: data.name,
          email: data.email,
          ...(data.old_password
            ? {
                password: data.password,
                old_password: data.old_password,
                password_confirmation: data.password_confirmation,
              }
            : {}),
        };

        const response = await api.put('profile', formData);
        updateUser(response.data);
        Alert.alert('Perfil atualizado com sucesso!');
        navigation.navigate('Dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        } else {
          Alert.alert(
            'Erro na atualização',
            'Ocorreu um erro ao fazer atualização, tente novamente',
          );
        }
      } finally {
        setLoading(false);
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione uma imagem de perfil',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar Camera',
        chooseFromLibraryButtonTitle: 'Escolher da Galeria',
      },
      async (response) => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar');
          return;
        }

        try {
          const croppedImageURI = await ImageEditor.cropImage(response.uri, {
            offset: { x: 0, y: 0 },
            size: { width: response.width, height: response.height },
            displaySize: { width: 400, height: 400 },
            resizeMode: 'contain',
          });
          const formData = new FormData();

          formData.append('avatar', {
            type: 'image/jpeg',
            name: `${user.id}.jpg`,
            uri: croppedImageURI,
          });
          setLoadingImage(true);
          api.patch('/users/avatar', formData).then((apiResponse) => {
            updateUser(apiResponse.data);
            setLoadingImage(false);
          });
        } catch (cropError) {
          Alert.alert('Erro na hora de alterar a imagem');
        }
      },
    );
  }, [updateUser, user.id]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <BackButton onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar>
                <UserAvatarImage source={{ uri: user.avatar_url }} />

                <UserIcon>
                  {loadingImage && (
                    <ActivityIndicator size="small" color="#312e38" />
                  )}
                  {!loadingImage && (
                    <Icon name="camera" size={32} color="#999591" />
                  )}
                </UserIcon>
              </UserAvatar>
            </UserAvatarButton>
            <View>
              <Title>Meu Perfil</Title>
            </View>
            <Form
              initialData={{ name: user.name, email: user.email }}
              ref={formRef}
              onSubmit={handleProfile}
            >
              <Input
                name="name"
                icon="user"
                placeholder="Name"
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputRef}
                name="old_password"
                icon="lock"
                placeholder="Senha atual"
                textContentType="newPassword"
                containerStyle={{ marginTop: 16 }}
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Nova senha"
                textContentType="newPassword"
                secureTextEntry
                returnKeyType="next"
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={confirmPasswordInputRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirma senha"
                textContentType="newPassword"
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />

              <Button
                loading={loading}
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Confirmar Mudanças
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
