import { Box, ScrollView, useColorModeValue, useTheme } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useAppContext } from '../../context';
import { fetchArticles } from '../../services';
import Header from './Header';
import NewsItem from './NewsItem';

const NewsScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState<Array<IArticle>>();
  const { tournament } = useAppContext();
  const theme = useTheme();
  const bodyColor = useColorModeValue(theme.colors.blueGray[100], theme.colors.blueGray[800]);
  useEffect(() => {
    onRefresh();
  }, [tournament]);

  const onRefresh = useCallback(async () => {
    if (tournament) {
      try {
        setLoading(true)
        const response = await fetchArticles(tournament); // Adjust query parameter as needed
        setArticles(response)
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }

    }
  }, [tournament]);

  const firstArticle = articles?.[0];
  return (
    <Box flex={1} safeArea bg={bodyColor}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 90 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[theme.colors.primary[700], theme.colors.secondary[500]]}
            tintColor={theme.colors.primary[700]}
          />
        }>
        {firstArticle && <Header item={firstArticle} />}
        {(articles?.length ? articles.slice(1) : [])?.map((item, index) => (
          <NewsItem key={`${item.docId}_${index}`} article={item} />
        ))}
      </ScrollView>
    </Box>
  );
};

export default React.memo(NewsScreen);
