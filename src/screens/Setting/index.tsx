import { faComment, faShare, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  Box,
  Center,
  ColorMode,
  HStack,
  Radio,
  ScrollView,
  Spinner,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  useTheme,
  VStack,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Appearance,
  Dimensions,
  Linking,
  Pressable
} from 'react-native';
import Share, { ShareOptions } from 'react-native-share';
import { sports } from '../../shared/sports';

const communities = [
  {
    id: 1,
    icon: faShare,
    name: 'Share',
  },
  {
    id: 2,
    icon: faComment,
    name: 'Telegram group',
  },
  {
    id: 3,
    icon: faStar,
    name: 'Rating',
  },
];
type ICommunity = (typeof communities)[number];
const shareOption: ShareOptions = {
  title: 'Sharing Stream Today',
  message:
    'Checkout Stream Today App for watching NFL, NHL, MLB, NCAAF, ...\n https://streamtoday.live',
};
const telegramAppUrl = 'tg://join?invite=3ZnY9n-wyUxkZmU1'; // Telegram URL scheme
const telegramWebUrl = 'https://t.me/+3ZnY9n-wyUxkZmU1'; // Web fallback URL
const { height, width } = Dimensions.get('window'); // Get screen dimensions

const SettingScreen: React.FC = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [switching, setSwitching] = useState(false);
  const [selectedValue, setSelectedValue] = useState(colorMode);
  const theme = useTheme();
  const bodyColor = useColorModeValue(theme.colors.blueGray[100], theme.colors.blueGray[800]);
  const bgColor = useColorModeValue(
    theme.colors.blueGray[200],
    theme.colors.blueGray[700],
  );
  const textColor = useColorModeValue(
    theme.colors.primary[700],
    theme.colors.gray[100],
  );
  const colorScheme = useColorModeValue('blue', 'yellow'); // Example color schemes for light/dark

  useEffect(() => {
    if (colorMode === selectedValue) {
      setSwitching(false);
    }
  }, [colorMode]);

  const communityPress = useCallback((comm: ICommunity) => {
    if (comm.id === 1) {
      Share.open(shareOption)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          err && console.log(err);
        });
    } else if (comm.id === 2) {
      Linking.canOpenURL(telegramAppUrl)
        .then(supported => {
          if (supported) {
            // Try to open the Telegram app
            return Linking.openURL(telegramAppUrl);
          } else {
            // Open the web URL if the Telegram app isn't available
            return Linking.openURL(telegramWebUrl);
          }
        })
        .catch(err => {
          console.error('Failed to open Telegram:', err);
          Alert.alert(
            'Error',
            'Failed to open Telegram. Please make sure the Telegram app is installed or try opening in a web browser.',
          );
        });
    }
  }, []);

  // Handle theme change
  const handleThemeChange = (value: ColorMode) => {
    setSelectedValue(value);
    setSwitching(true);
    if (!['dark', 'light'].includes(value as string)) {
      const systemColorScheme = Appearance.getColorScheme();
      setColorMode(systemColorScheme);
    } else {
      setColorMode(value); // Set 'light' or 'dark'
    }
  };

  return (
    <Box flex={1} safeArea bgColor={bodyColor}>
      <ScrollView>
        <Box flex={1} p={4}>
          <VStack bg={bgColor} rounded={'2xl'} mb={4} pb={2}>
            <Box
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
              pb={0}
              pt={3}>
              <Text fontSize={'lg'} color={textColor} fontWeight={'bold'}>
                Notification
              </Text>
            </Box>
            {sports.map(sport => (
              <HStack
                px={4}
                alignItems="center"
                justifyContent={'space-between'}
                borderBottomColor={theme.colors.gray[200]}
                key={sport.id}>
                <HStack space={2} alignItems={'center'}>
                  <FontAwesomeIcon
                    icon={sport.icon}
                    size={20}
                    color={textColor}
                  />
                  <Text color={textColor} fontSize="md" py={3}>
                    {sport.name}
                  </Text>
                </HStack>
                <Switch size="md" defaultIsChecked color={textColor} />
              </HStack>
            ))}
          </VStack>
          <VStack bg={bgColor} rounded={'2xl'} mb={4} pb={2}>
            <Box
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
              pb={0}
              pt={3}>
              <Text fontSize={'lg'} color={textColor} fontWeight={'bold'}>
                Community
              </Text>
            </Box>
            {communities.map(comm => (
              <Pressable
                key={`${comm.id}_${comm.name}`}
                onPress={() => communityPress(comm)}>
                <HStack
                  px={4}
                  alignItems="center"
                  space={2}
                  borderBottomColor={theme.colors.gray[200]}>
                  <FontAwesomeIcon
                    icon={comm.icon}
                    size={20}
                    color={textColor}
                  />
                  <Text color={textColor} fontSize="md" py={3}>
                    {comm.name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
          <VStack bg={bgColor} rounded={'2xl'} mb={4} pb={2}>
            <Box
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
              pb={0}
              pt={3}>
              <Text fontSize={'lg'} color={textColor} fontWeight={'bold'}>
                Theme
              </Text>
            </Box>
            <Center>
              <Radio.Group
                name="themeSwitcher"
                value={selectedValue as string}
                onChange={nextValue =>
                  handleThemeChange(nextValue as ColorMode)
                }>
                <HStack
                  px={4}
                  py={4}
                  space={4}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <Radio value="light" my={1} colorScheme={colorScheme}>
                    <Text color={textColor}>Light</Text>
                  </Radio>
                  <Radio value="dark" my={1} colorScheme={colorScheme}>
                    <Text color={textColor}>Dark</Text>
                  </Radio>
                </HStack>
              </Radio.Group>
            </Center>
          </VStack>
        </Box>
      </ScrollView>
      {switching && (
        <Center
          position="absolute"
          top={-56}
          left={0}
          right={0}
          bottom={0}
          width={width}
          height={height}
          zIndex={1000}
          bg="rgba(0, 0, 0, 0.5)" // Semi-transparent background
        >
          <Spinner size="lg" color={textColor} />
        </Center>
      )}
    </Box>
  );
};

export default SettingScreen;
