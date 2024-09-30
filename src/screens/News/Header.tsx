import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  Box,
  Image,
  Pressable,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
} from 'native-base';
import React, {useCallback} from 'react';
import {Dimensions} from 'react-native';
import {calculateHoursAgo} from '../../shared/utils';

interface HeaderProps {
  item: IArticle;
}

const Header: React.FC<HeaderProps> = ({item}) => {
  const navigation = useNavigation<NativeStackNavigationProp<any, 'Home'>>();
  const {images, headline, published} = item;
  const imageUrl = images?.[0]?.url;
  const theme = useTheme();
  const primaryColor = useColorModeValue(
    theme.colors.light[100],
    theme.colors.gray[300],
  );

  const goToNewsDetail = useCallback(() => {
    navigation.navigate('WebView', {
      url: item.links.web.href,
      title: 'Detail',
    });
  }, [item, navigation]);

  return (
    <Box position="relative">
      <Image
        source={{uri: imageUrl}}
        alt="header image"
        width={Dimensions.get('window').width}
        height={200}
      />
      <VStack
        position="absolute"
        bottom={4}
        left={0}
        right={0}
        p={1}
        borderRadius={5}>
        <Pressable onPress={goToNewsDetail}>
          <Box bg="rgba(0, 0, 0, 0.5)" rounded={'lg'} px={4} py={2}>
            <Text color={primaryColor} fontSize="sm" bold>
              {headline}
            </Text>
            <Text color={primaryColor} fontSize="xs">
              {calculateHoursAgo(published)}
            </Text>
          </Box>
        </Pressable>
      </VStack>
    </Box>
  );
};

export default Header;
