import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { theme } from '../theme';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginBottom: theme.spacing.small,
    marginHorizontal: theme.spacing.small,
  },
  inputContainer: {
    borderWidth: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.5)',
    ...theme.typography.input,
  },
  inputContainerFocused: {
    backgroundColor: 'rgba(250,250,250,0.65)',
  },
  inputContainerError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    height: theme.typography.caption1.fontSize * 2.8,
    margin: theme.spacing.xTiny,
  },
});

const LoginInput = ({ ...props }) => {
  const inputContainerStyle = [
    styles.inputContainer,
    props.errorText && styles.inputContainerError,
  ];

  return (
    <View style={styles.container}>
      <TextInput
        selectionColor={theme.colors.primary}
        autoCorrect={false}
        autoCapitalize="none"
        {...props}
        style={[inputContainerStyle, props.style]}
      />
      <Text style={styles.errorText}>{props.errorText}</Text>
    </View>
  );
};

export default LoginInput;
