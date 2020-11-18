import React, { useContext, useEffect, useReducer } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ButtonWithIcon from '../../components/ButtonWithIcon';
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
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
          </View>
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
        <ButtonWithIcon
          title="Dashboard Activities"
          iconName="dashboard"
          onPress={() => navigation.navigate('Dashboard Activities')}
        />
        <ButtonWithIcon
          title="Feedback"
          iconName="feedback"
          onPress={() => navigation.navigate('Feedback')}
        />
        <ButtonWithIcon
          title="Support"
          iconName="help"
          onPress={() => navigation.navigate('Support')}
        />
        <ButtonWithIcon
          title="Settings"
          iconName="settings"
          onPress={() => navigation.navigate('Settings')}
        />
      </DefaultScrollView>
      <View>
        <TouchableHighlight onPress={signOut}>
          <View style={styles.signOutButton}>
            <MaterialIcons name="login" size={24} color={theme.colors.white} />
            <Text style={styles.signOutText}>Logout</Text>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    height: 150,
    padding: theme.spacing.small,
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
  scrollContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3EB6EF',
    color: theme.colors.white,
    padding: theme.spacing.base,
    flexDirection: 'row',
  },
  signOutText: {
    marginLeft: theme.spacing.small,
    color: theme.colors.white,
    ...theme.typography.body,
  },
});

export default Account;
