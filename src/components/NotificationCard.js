import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme';

const NotificationCard = ({ heading, avatar, body, color }) => {
  const notificationColor = {
    backgroundColor: color,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.accent, notificationColor]}>
        <Text> </Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>{heading}</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={[styles.avatar, notificationColor]}>
            <Text style={styles.avatarText}>{avatar}</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.bodyText}>{body}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9',
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginBottom: theme.spacing.small,
  },
  accent: {
    width: theme.spacing.tiny,
  },
  contentContainer: {
    padding: theme.spacing.small,
  },
  textContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: theme.spacing.small,
  },
  avatar: {
    width: theme.spacing.large,
    height: theme.spacing.large,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: theme.colors.white,
  },
  bodyContainer: {
    alignSelf: 'stretch',
    paddingRight: theme.spacing.small,
    paddingLeft: theme.spacing.small,
    maxWidth: '80%',
  },
  bodyText: {
    color: '#929292',
    alignSelf: 'stretch',
    overflow: 'visible',
  },
  headingText: {
    color: '#868686',
  },
  headingContainer: {
    maxWidth: '80%',
  },
});

export default NotificationCard;
