import { Card, Tag, Typography, Space } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import type { INewsItem } from "../../types/news";
import React from "react";
import styles from "./NewsCard.module.css";

const { Title, Paragraph } = Typography;

interface NewsItemProps {
  item: INewsItem;
}

export const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  return (
    <Card className={styles.newsCard}>
      <div className={styles.cardContent}>
        <Title level={4} className={styles.newsTitle}>
          {item.title}
        </Title>

        <Paragraph ellipsis={{ rows: 3 }} className={styles.newsBody}>
          {item.body}
        </Paragraph>

        <div className={styles.metaContainer}>
          <div className={styles.tagsContainer}>
            {item.tags.map((tag) => (
              <Tag key={tag} className={styles.newsTag}>
                {tag}
              </Tag>
            ))}
          </div>

          <div className={styles.reactionsContainer}>
            <Space size="middle">
              <span className={`${styles.reaction} ${styles.like}`}>
                <LikeFilled />
                <span className={styles.count}>{item.reactions.likes}</span>
              </span>
              <span className={`${styles.reaction} ${styles.dislike}`}>
                <DislikeFilled />
                <span className={styles.count}>{item.reactions.dislikes}</span>
              </span>
            </Space>
          </div>
        </div>
      </div>
    </Card>
  );
};
