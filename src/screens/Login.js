import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Button } from 'react-native';

import { theme } from '../theme';
import { AuthContext } from '../context/auth.js';
import LoginInput from '../components/LoginInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.small,
  },
  button: {
    alignSelf: 'stretch',
  },
});

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
        <Button
          title="Login"
          style={styles.button}
          onPress={() => signIn({ email, password })}
        />
      </ScrollView>
    </View>
  );
};

export default Login;
