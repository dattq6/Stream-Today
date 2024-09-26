import React from 'react';
import {ScrollView} from 'react-native';
import {
  NativeBaseProvider,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Center,
  useColorMode,
  useColorModeValue,
} from 'native-base';

const ScrollablePage = () => {
  const {toggleColorMode} = useColorMode();
  const text = useColorModeValue('Light', 'Dark');
  const bg = useColorModeValue('warmGray.50', 'coolGray.800');
  return (
    <ScrollView>
      <VStack space={4} p={4}>
        <Center>
          <Box p="4" flex="1" bg={bg} maxW="300" w="100%" mt={10} safeArea>
            <Text fontSize="lg" display="flex" mb={20}>
              The active color mode is{' '}
              <Text bold fontSize="18px">
                {text}
              </Text>
            </Text>
            <Button onPress={toggleColorMode} h={10}>
              Toggle
            </Button>
          </Box>
        </Center>
        {/* Header */}
        <Box bg="primary.500" p={4} rounded="md">
          <Heading color="white">Scrollable Layout</Heading>
        </Box>

        {/* Content Section 1 */}
        <Box bg="light.100" p={4} rounded="md">
          <Text fontSize="md">This is some scrollable content.</Text>
        </Box>

        {/* Content Section 2 */}
        <Box bg="light.100" p={4} rounded="md">
          <Text fontSize="md">You can add as many sections as needed.</Text>
        </Box>

        {/* Content Section 3 */}
        <Box bg="light.100" p={4} rounded="md">
          <Text fontSize="md">
            The page will scroll as more content is added.
          </Text>
        </Box>

        {/* Footer */}
        <Center>
          <Button size="lg" colorScheme="primary" mt={4}>
            Action Button
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default ScrollablePage;
