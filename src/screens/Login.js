import React, { useContext, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DefaultScrollView from '../components/default/DefaultScrollView';

import { theme } from '../theme';
import { AuthContext } from '../context/auth.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  return (
    <DefaultScrollView styleScroll={styles.scrollContainer}>
      <Image
        style={styles.image}
        source={require('../assets/LoginImage.png')}
      />
      <TextInput
        type="flat"
        label="Email"
        value={email}
        autoCapitalize="none"
        style={styles.inputContainer}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        type="flat"
        label="Password"
        secureTextEntry={true}
        value={password}
        autoCapitalize="none"
        style={styles.inputContainer}
        onChangeText={(value) => setPassword(value)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => signIn({ email, password })}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
    </DefaultScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    margin: theme.spacing.small,
    justifyContent: 'center',
    height: theme.spacing.large,
    backgroundColor: theme.colors.blue,
    width: 150,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    color: theme.colors.white,
  },
  scrollContainer: {
    padding: theme.spacing.small,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    justifyContent: 'space-around',
  },
  inputContainer: {
    margin: theme.spacing.small,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.white,
  },
});

export default Login;
