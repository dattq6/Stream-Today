import React, {useState} from 'react';
import {useColorMode} from 'native-base';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Text, Box, HStack, useTheme} from 'native-base';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const FacebookStyleTabs = ({tabs}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {colorMode} = useColorMode();
  const {colors} = useTheme();
  const translateX = new Animated.Value(0);

  const isDarkMode = colorMode === 'dark';
  const backgroundColor = isDarkMode ? colors.dark[100] : colors.light[100];
  const textColor = isDarkMode ? colors.light[100] : colors.dark[100];
  const indicatorColor = isDarkMode ? colors.blue[300] : colors.blue[500];

  const handleTabPress = index => {
    setActiveIndex(index);
    Animated.spring(translateX, {
      toValue: index * (width / tabs.length),
      useNativeDriver: true,
    }).start();
  };

  const onGestureEvent = Animated.event(
    [{nativeEvent: {translationX: translateX}}],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const {translationX} = event.nativeEvent;
      const tabWidth = width / tabs.length;
      let newIndex = activeIndex;

      if (translationX < -tabWidth / 2 && activeIndex < tabs.length - 1) {
        newIndex = activeIndex + 1;
      } else if (translationX > tabWidth / 2 && activeIndex > 0) {
        newIndex = activeIndex - 1;
      }

      setActiveIndex(newIndex);
      Animated.spring(translateX, {
        toValue: newIndex * tabWidth,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Box bg={backgroundColor}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <View>
          <HStack justifyContent="space-around" alignItems="center">
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTabPress(index)}
                style={styles.tab}>
                <Text
                  color={textColor}
                  fontWeight={activeIndex === index ? 'bold' : 'normal'}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </HStack>
          <Animated.View
            style={[
              styles.indicator,
              {
                width: width / tabs.length,
                backgroundColor: indicatorColor,
                transform: [{translateX}],
              },
            ]}
          />
        </View>
      </PanGestureHandler>
    </Box>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  indicator: {
    height: 3,
    position: 'absolute',
    bottom: 0,
  },
});

export default FacebookStyleTabs;
