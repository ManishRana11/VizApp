import React, { useContext, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import LoginButton from '../components/LoginButton';

import { theme } from '../theme';
import { AuthContext } from '../context/auth.js';
import LoginInput from '../components/LoginInput';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Image
            style={styles.image}
            source={require('../assets/LoginImage.png')}
          />
        </View>
        <LoginInput
          style={styles.input}
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="Email ID"
          value={email}
          onChangeText={setEmail}
        />
        <LoginInput
          style={styles.input}
          textContentType="password"
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <LoginButton onPress={signIn({ email, password })} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    alignItems: 'center',
    padding: theme.spacing.small,
    flex: 1,
    flexDirection: 'column',
    height: '100%',
  },
  button: {
    // alignSelf: 'stretch',
    alignItems: 'center',
    margin: theme.spacing.small,
    justifyContent: 'center',
    height: theme.spacing.large,
    backgroundColor: theme.colors.blue,
    width: 150,
    borderRadius: 10,
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
  input: {
    marginTop: 'auto',
  },
});

export default Login;
