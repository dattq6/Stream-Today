import React, {FC, PropsWithChildren} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useTheme} from 'native-base';

const LoadingView: FC<PropsWithChildren> = ({children}) => {
  const theme = useTheme();
  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={theme.colors.primary[700]} />
      {children}
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

export default LoadingView;
