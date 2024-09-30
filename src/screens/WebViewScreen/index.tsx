import { RouteProp } from '@react-navigation/native';
import { Box } from 'native-base';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import LoadingView from '../../components/Loading';
import { IAppStack } from '../../types';


const WebViewScreen: React.FC = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const { url } = route.params;

  return (
    <Box flex={1}>
      {loading && <LoadingView />}
      <WebView
        source={{ uri: url }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        style={{ flex: 1, opacity: loading ? 0 : 1 }}
      />
    </Box>
  );
};

export default WebViewScreen;
