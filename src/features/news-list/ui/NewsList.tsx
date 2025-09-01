import React, { useEffect, useCallback } from "react";
import { List, Spin, Alert, Divider } from "antd";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import { fetchNews } from "@/entities/news/model/slice";
import {
  selectNewsItems,
  selectNewsStatus,
  selectNewsError,
  selectNewsHasMore,
  selectNewsOffset,
} from "@/entities/news/model/selectors";
import { NewsCard } from "@/entities/news/ui/NewsCard/NewsCard";
import type { NewsItem } from "@/entities/news/model/types";
import styles from "./NewsList.module.css";

export const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectNewsItems);
  const isLoading = useAppSelector(selectNewsStatus);
  const error = useAppSelector(selectNewsError);
  const hasMore = useAppSelector(selectNewsHasMore);
  const offset = useAppSelector(selectNewsOffset);

  useEffect(() => {
    if (items.length === 0 && !isLoading) {
      dispatch(fetchNews({ limit: 10, offset: 0 }));
    }
  }, [dispatch, items.length, isLoading]);

  const loadNews = useCallback(() => {
    if (hasMore && !isLoading) {
      dispatch(fetchNews({ limit: 10, offset }));
    }
  }, [dispatch, hasMore, isLoading, offset]);

  const handleScroll = useCallback(() => {
    if (isLoading || !hasMore) {
      return;
    }

    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const pageHeight = document.documentElement.offsetHeight;

    if (scrollPosition >= pageHeight - 100) {
      loadNews();
    }
  }, [isLoading, hasMore, loadNews]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (error) {
    return <Alert message="Ошибка" description={error} type="error" showIcon />;
  }

  return (
    <div className={styles.newsContainer}>
      <Divider orientation="left" className={styles.newsHeader}>
        News
      </Divider>

      <List
        dataSource={items}
        renderItem={(item: NewsItem) => (
          <List.Item key={item.id}>
            <NewsCard item={item} />
          </List.Item>
        )}
        locale={{ emptyText: "Новостей пока нет" }}
      />

      <div className={styles.loadingIndicator}>
        {isLoading && <Spin size="large" />}
        {!hasMore && items.length > 0 && (
          <Divider plain className={styles.endMessage}>
            Все новости загружены
          </Divider>
        )}
      </div>
    </div>
  );
};
