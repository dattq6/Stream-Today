import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Box,
  Center,
  HStack,
  Pressable,
  Text,
  useColorModeValue,
  useTheme
} from 'native-base';
import React, { useMemo } from 'react';
import { useTournament } from '../../context';
import { sports } from '../../shared/sports';

type RootStackParamList = {
  Home: undefined;
  NewScreen: undefined;
  Sport: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface CommonHeaderProps {
  title?: string;
}

const CommonHeader: React.FC<CommonHeaderProps> = ({ title }) => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const tournament = useTournament();
  const bodyColor = useColorModeValue(theme.colors.blueGray[100], theme.colors.blueGray[800]);
  const bgButtonColor = useColorModeValue(
    theme.colors.gray[200],
    theme.colors.gray[700],
  );
  const textColor = useColorModeValue(
    theme.colors.primary[700],
    theme.colors.gray[100],
  );

  const sportIcon = useMemo(() => {
    const sport = sports.find(sp => sp.name.toLowerCase() === tournament);
    return sport ? sport.icon : sports[0].icon;
  }, [tournament]);

  const goToHome = () => {
    navigation.toggleDrawer();
  };

  const goToNewScreen = () => {
    navigation.navigate('Setting');
  };

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      px={2}
      py={2}
      bg={bodyColor}>
      <Pressable onPress={goToHome}>
        <HStack
          space={1}
          alignItems="center"
          justifyContent={'center'}
          bg={bgButtonColor}
          borderRadius={8}
          height={10}
          px={3}>
          <FontAwesomeIcon icon={sportIcon} color={textColor} size={16} />
          <Text color={textColor} fontSize="md" fontWeight="bold">
            {tournament?.toUpperCase()}
          </Text>
        </HStack>
      </Pressable>

      {title && (
        <Center flex={1}>
          <Text color="#1e3a8a" fontSize={18} fontWeight="bold">
            {title}
          </Text>
        </Center>
      )}

      <Pressable onPress={goToNewScreen}>
        <Box
          height={10}
          justifyContent={'center'}
          alignItems={'center'}
          bg={bgButtonColor}
          borderRadius={8}
          px={3}>
          <FontAwesomeIcon icon={faGear} color={textColor} size={20} />
        </Box>
      </Pressable>
    </HStack>
  );
};

export default React.memo(CommonHeader);
