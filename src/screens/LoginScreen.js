import React, { memo, useState } from 'react';
import { connect } from "react-redux";
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import * as actions from '../Store/Actions/type';
import axios from 'axios';
import APIModel from '../Models/APIModal';
import { emailValidator, passwordValidator } from '../core/utils';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [submitting, setSubmitting] = useState({ value: false });
  
  const _onLoginPressed = () => {

    setSubmitting({ value: true });

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setSubmitting({ ...submitting });
      return;
    }
    const data = {email:email.value , password:password.value};
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    const url = `${APIModel.HOST}/login`;
    
    axios.post( url, data, { headers })
        .then(response => {
          console.log({ response });
          // const message = response.data.message; 
          // dispatch({
          //   type: actions.LOGIN,
          //   payload: {
          //     response,
          //   },
          // });
          navigation.navigate('Dashboard');
        })
        .catch(error => {
            alert(error.message);
            setSubmitting({ ...submitting });
            console.error('There was an error!', error);
        });
  };

  return (
    <Background>
      <Logo />

      <Header>Login</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button disabled={submitting.value} mode="contained" onPress={_onLoginPressed} >{submitting.value ? 'Please wait...' : 'Sign In'}</Button>
      
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);