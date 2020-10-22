import { StyleSheet } from 'react-native';

const colors = {
  primary: '#00d474',
  success: '#28a745',
  error: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  appbar: '#ffffff',
  blue: '#185F8A',
  white: '#FFFFFF',
  gray: '#9E9E9E',
};

export const theme = {
  spacing: {
    xTiny: 4,
    tiny: 8,
    small: 16,
    base: 24,
    large: 48,
    xLarge: 64,
  },
  colors,
  typography: StyleSheet.create({
    largeTitle: {
      fontSize: 34,
    },
    title1: {
      fontSize: 28,
    },
    title2: {
      fontSize: 22,
    },
    title3: {
      fontSize: 18,
    },
    titleCaption: {
      fontSize: 16,
    },
    header: {
      fontSize: 18,
      letterSpacing: 0.5,
    },
    button: {
      fontSize: 18,
      letterSpacing: 0.5,
    },
    textButton: {
      fontSize: 16,
    },
    input: {
      fontSize: 18,
    },
    headline: {
      fontSize: 17,
      letterSpacing: 0.5,
    },
    body: {
      fontSize: 15,
    },
    caption1: {
      fontSize: 14,
    },
    caption2: {
      fontSize: 12,
    },
    caption3: {
      fontSize: 10,
    },
  }),
};
