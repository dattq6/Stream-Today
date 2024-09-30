import {
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  useColorModeValue,
  useTheme,
  VStack,
} from 'native-base';
import React, { memo, useCallback } from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { calculateHoursAgo } from '../../shared/utils';

type ItemProps = {
  article: IArticle;
};

const Item: React.FC<ItemProps> = ({ article }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any, 'Home'>>();
  const theme = useTheme();
  const { images, headline, description, published } = article;
  const imageUrl = images?.[0]?.url;
  const primaryColor = useColorModeValue(
    theme.colors.primary[700],
    theme.colors.gray[100],
  );
  const cardColor = useColorModeValue(
    theme.colors.blueGray[100],
    theme.colors.blueGray[700],
  );
  const descriptionColor = useColorModeValue(
    theme.colors.gray[500],
    theme.colors.gray[300],
  );

  const goToNewsDetail = useCallback(async () => {
    navigation.navigate('WebView', {
      url: article.links.web.href,
      title: 'Detail',
    });
  }, [article]);

  return (
    <Pressable onPress={goToNewsDetail}>
      <Box
        borderColor={theme.colors.coolGray[300]}
        backgroundColor={cardColor}
        mb={2}
        paddingX={3}
        paddingY={1}>
        <HStack space={2}>
          <Image
            source={
              imageUrl
                ? {
                  uri: imageUrl,
                }
                : require('../../assets/images/NoImage.png')
            }
            alt={headline?.substring(0, 10)}
            size="100px"
            maxW={100}
            borderRadius="md"
          />
          <VStack flex={1} justifyContent="center">
            <Text
              color={primaryColor}
              fontSize="sm"
              fontWeight="bold"
              numberOfLines={2}>
              {headline}
            </Text>
            <Text fontSize="xs" color={descriptionColor} numberOfLines={2}>
              {description}
            </Text>
            <Text
              fontSize="2xs"
              color={theme.colors.primary[300]}
              alignSelf={'end'}>
              {calculateHoursAgo(published)}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default memo(Item);
