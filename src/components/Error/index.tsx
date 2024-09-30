import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ErrorView: FC<PropsWithChildren> = ({children}) => {
  return (
    <View style={styles.centered}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ErrorView;
