import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/auth';

const Account = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      <Text>Account</Text>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
};

export default Account;
