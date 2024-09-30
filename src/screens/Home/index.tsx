import { Box, ScrollView, useColorModeValue, useTheme } from 'native-base';
import React from 'react';
import TopTabs from '../../navigation/TopTab';
import { body } from '../../shared/colors';

const HomeScreen = () => {
  const theme = useTheme();
  const bodyColor = useColorModeValue(theme.colors.blueGray[100], theme.colors.blueGray[800]);
  return (
    <Box flex={1} safeArea bg={bodyColor}>
      <TopTabs />
    </Box>
  );
}

export default HomeScreen;
