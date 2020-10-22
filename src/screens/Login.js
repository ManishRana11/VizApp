import React, { useContext, useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Keyboard,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DefaultScrollView from '../components/default/DefaultScrollView';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { theme } from '../theme';
import { AuthContext } from '../context/auth.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <DefaultScrollView styleScroll={styles.scrollContainer}>
      <Image
        style={styles.image}
        source={require('../assets/LoginImage.png')}
      />
      <TextInput
        type="flat"
        color={theme.colors.gray}
        selectionColor={theme.colors.gray}
        returnKeyType="next"
        label="Email ID"
        value={email}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        style={styles.inputContainer}
        onChangeText={(value) => setEmail(value)}
        right={<TextInput.Icon icon="account" color={theme.colors.gray} />}
      />
      <TextInput
        type="flat"
        label="Password"
        selectionColor={theme.colors.gray}
        returnKeyType="done"
        secureTextEntry={!showPassword}
        value={password}
        autoCapitalize="none"
        style={styles.inputContainer}
        onChangeText={(value) => setPassword(value)}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => toggleShowPassword()}
            color={theme.colors.gray}
          />
        }
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Keyboard.dismiss();
          signIn({ email, password });
        }}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
          <MaterialIcons
            name="arrow-right-alt"
            size={24}
            color={theme.colors.white}
          />
        </View>
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 80,
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
    color: theme.colors.gray,
    borderColor: theme.colors.gray,
  },
});

export default Login;
