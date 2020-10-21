import React, { useContext, useEffect, useReducer } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-paper';
import { AuthContext } from '../../context/auth';
import CognitensorEndpoints from '../../services/network/CognitensorEndpoints';
import { apiStateReducer } from '../../reducers/ApiStateReducer';
import DefaultScrollView from '../../components/default/DefaultScrollView';
import { theme } from '../../theme';

const Account = ({ navigation }) => {
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
    <>
      <DefaultScrollView
        styleView={styles.container}
        styleScroll={styles.scrollContainer}>
        <Avatar.Icon size={100} icon="account-circle" style={styles.avatar} />
        {userDetails.isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <>
            <Text style={styles.name}>{userDetails.data.user.username}</Text>
            <Text style={styles.email}>
              {userDetails.data.user.local_email}
            </Text>
            <View style={styles.userInfo}>
              <View>
                <Text style={styles.userText}>{userDetails.data.user.id}</Text>
                <Text style={styles.userSubText}>User ID</Text>
              </View>
              <View>
                <Text style={styles.userText}>
                  {userDetails.data.user.department || 'Not Assigned'}
                </Text>
                <Text style={styles.userSubText}>Department</Text>
              </View>
              <View>
                <Text style={styles.userText}>
                  {userDetails.data.user.roles || 'Not Assigned'}
                </Text>
                <Text style={styles.userSubText}>Role</Text>
              </View>
            </View>
          </>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard Activities')}
          style={styles.accountButton}>
          <Text>Dashboard Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Feedback')}
          style={styles.accountButton}>
          <Text>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Support')}
          style={styles.accountButton}>
          <Text>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={styles.accountButton}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </DefaultScrollView>
      <View>
        <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    backgroundColor: '#BBBBBB',
  },
  name: {
    marginTop: theme.spacing.small,
    ...theme.typography.headline,
  },
  email: {
    ...theme.typography.body,
    fontStyle: 'italic',
    marginTop: theme.spacing.xTiny,
    color: 'rgba(99, 99, 99, 0.70)',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    margin: theme.spacing.tiny,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.small,
  },
  userText: {
    ...theme.typography.body,
  },
  userSubText: {
    color: '#5CA9FF',
  },
  accountButton: {
    backgroundColor: '#FBFBFB',
    alignSelf: 'stretch',
    padding: theme.spacing.base,
    borderBottomWidth: 1.5,
    borderColor: 'rgba(221, 221, 221, 0.24)',
    ...theme.typography.body,
  },
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#3EB6EF',
    color: theme.colors.white,
    padding: theme.spacing.small,
  },
  signOutText: {
    color: theme.colors.white,
    ...theme.typography.body,
  },
});

export default Account;
