import React, { useContext, useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

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
          value={email}
          onChangeText={setEmail}
        />
        <LoginInput
          style={styles.input}
          textContentType="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          title="Login"
          style={styles.button}
          onPress={() => signIn({ email, password })}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
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
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    margin: theme.spacing.small,
    justifyContent: 'flex-end',
  },
  input: {
    marginTop: 'auto',
  },
});

export default Login;
