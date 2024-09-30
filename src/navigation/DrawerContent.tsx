import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Box,
  HStack,
  Pressable,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
} from 'native-base';
import React from 'react';
import { useAppContext } from '../context';
import { sports } from '../shared/sports';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const { tournament, setTournament } = useAppContext();
  const theme = useTheme();
  const bodyColor = useColorModeValue(theme.colors.blueGray[100], theme.colors.blueGray[800]);
  const textColor = useColorModeValue(theme.colors.gray[800], theme.colors.gray[200]);
  const activeBodyColor = useColorModeValue(theme.colors.gray[300], theme.colors.gray[700]);
  const activeTextColor = useColorModeValue(theme.colors.primary[500], theme.colors.primary[200]);

  const handleSelectTournament = (item: (typeof sports)[number]) => {
    props.navigation.closeDrawer();
    setTimeout(() => {
      setTournament(item.name.toLowerCase());
    }, 1);
  };

  return (
    <Box flex={1} bg={bodyColor}>
      <DrawerContentScrollView {...props}>
        <VStack bg={bodyColor} space={4} mt={4}>
          {/* Header */}
          <Box
            mb={1}
            pb={4}
            bg={bodyColor}
            alignItems={'center'}
            borderBottomWidth={1}
            borderColor="gray.200">
            <HStack>
              <Text fontSize="2xl" fontWeight="bold" color={activeTextColor}>
                Stream Today
              </Text>
              <Text fontSize="sm" fontWeight="bold" color={activeTextColor}>
                V1.0
              </Text>
            </HStack>
          </Box>

          {/* Menu Items */}
          {sports.map(item => (
            <Pressable
              key={item.id}
              onPress={() => handleSelectTournament(item)}
              bg={
                tournament === item.name.toLowerCase()
                  ? activeBodyColor
                  : bodyColor
              }
              color={
                tournament === item.name.toLowerCase()
                  ? activeTextColor
                  : textColor
              }
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#ddd' : 'transparent',
              })}>
              <HStack
                px={6}
                py={2}
                space={4}
                alignItems="center"
                borderBottomColor={theme.colors.gray[200]}>
                <FontAwesomeIcon
                  icon={item.icon}
                  size={24}
                  color={
                    tournament === item.name.toLowerCase()
                      ? activeTextColor
                      : textColor
                  }
                />
                <Text
                  color={
                    tournament === item.name.toLowerCase()
                      ? activeTextColor
                      : textColor
                  }
                  fontSize="xl"
                  fontWeight="bold">
                  {item.name}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </DrawerContentScrollView>
    </Box>
  );
};

export default DrawerContent;
