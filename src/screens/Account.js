import React, { useContext, useEffect, useReducer } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/auth';
import CognitensorEndpoints from '../services/network/CognitensorEndpoints';
import { apiStateReducer } from '../reducers/ApiStateReducer';
import DefaultScrollView from '../components/default/DefaultScrollView';
import { theme } from '../theme';

const Account = () => {
  const { signOut } = useContext(AuthContext);
  const [userDetails, dispatchUserDetails] = useReducer(apiStateReducer, {
    data: [],
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    CognitensorEndpoints.getUserDetails({
      dispatchReducer: dispatchUserDetails,
    });
  }, []);

  return (
    <DefaultScrollView
      styleView={styles.container}
      styleScroll={styles.scrollContainer}>
      <Text>Account</Text>
      {userDetails.isError && <Text>Error</Text>}
      {userDetails.isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>{userDetails.data.user.username}</Text>
          <Text>{userDetails.data.user.local_email}</Text>
          <Text>{userDetails.data.user.roles}</Text>
        </>
      )}
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
