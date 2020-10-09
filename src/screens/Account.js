import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth';
import DefaultScrollView from '../components/default/DefaultScrollView';
import { theme } from '../theme';

const Account = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <DefaultScrollView
      styleView={styles.container}
      styleScroll={styles.scrollContainer}>
      <Text>Account</Text>
      <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </DefaultScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: theme.spacing.small,
  },
});

export default Account;
