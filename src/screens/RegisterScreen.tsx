import React, { useContext, useEffect } from 'react';
import { View, Text, TextInput, Platform, KeyboardAvoidingView, Keyboard, TouchableOpacity, Alert } from 'react-native';
import WhiteLogo from '../components/WhiteLogo';
import { loginStyles } from '../theme/LoginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';


interface Props extends StackScreenProps<any, any> { }
const RegisterScreen = ({ navigation }: Props) => {
  const { email, password, name, onChange } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const { singUp, errorMessage, removeError } = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert(
      'Error al registrar el usuario',
      errorMessage,
      [
        {
          text: 'OK',
          onPress: removeError
        }
      ]

    )
  }, [errorMessage])


  const onRegister = () => {
    Keyboard.dismiss();
    singUp({nombre: name, correo: email, password})
    console.log({ name, email, password });
  }
  return (
    <>
      {/* Background */}
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#0070A6' }}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Registro</Text>

          <Text style={loginStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su Nombre"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="default"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
            autoCapitalize="words"
            autoCorrect={false}
          />

          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su email"
            placeholderTextColor="rgba(255,255,255,0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={loginStyles.label}>Contraseña:</Text>
          <TextInput
            placeholder="*******"
            placeholderTextColor="rgba(255,255,255,0.4)"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              loginStyles.inputField,
              (Platform.OS === 'ios') && loginStyles.inputFieldIOS
            ]}
            selectionColor="white"
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onRegister}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={loginStyles.button}
              onPress={onRegister}
            >
              <Text style={loginStyles.buttonText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => navigation.replace('LoginScreen')}
            activeOpacity={0.8}
            style={loginStyles.buttonReturn}
          >
            <Text style={loginStyles.buttonText}>Login</Text>

          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

    </>
  )
}

export default RegisterScreen;