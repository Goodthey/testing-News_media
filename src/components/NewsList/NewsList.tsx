import React, { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { List, Spin, Alert, Divider } from "antd";
import { fetchNews, clearNews } from "../../store/slices/newsSlice";
import { NewsItem } from "../NewsCard/NewsCard";
import styles from "./NewsList.module.css";

export const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, isLoading, error, hasMore, skip } = useAppSelector(
    (state) => state.news
  );

  useEffect(() => {
    dispatch(clearNews());
    return () => {
      dispatch(clearNews());
    };
  }, [dispatch]);

  const loadNews = useCallback(() => {
    if (hasMore && !isLoading) {
      dispatch(fetchNews({ limit: 10, skip }));
    }
  }, [dispatch, hasMore, isLoading, skip]);

  useEffect(() => {
    if (news.length === 0) {
      loadNews();
    }
  }, [loadNews, news.length]);

  const handleScroll = useCallback(() => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const pageHeight = document.documentElement.offsetHeight;
    const threshold = 100;

    if (scrollPosition < pageHeight - threshold || isLoading || !hasMore) {
      return;
    }
    loadNews();
  }, [isLoading, hasMore, loadNews]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) {
    return (
      <Alert
        message="Ошибка загрузки"
        description={error}
        type="error"
        showIcon
        className={styles.errorAlert}
      />
    );
  }

  return (
    <div className={styles.newsContainer}>
      <Divider orientation="left" className={styles.newsHeader}>
        News
      </Divider>

      <List
        grid={{ gutter: 24, xs: 1, sm: 2, lg: 3 }}
        dataSource={news}
        renderItem={(item) => (
          <List.Item key={item.id} className={styles.newsListItem}>
            <NewsItem item={item} />
          </List.Item>
        )}
        locale={{ emptyText: "Новостей пока нет" }}
      />

      <div className={styles.loadingIndicator}>
        {isLoading && <Spin size="large" />}
        {!hasMore && news.length > 0 && (
          <Divider plain className={styles.endMessage}>
            Все новости загружены
          </Divider>
        )}
      </div>
    </div>
  );
};
