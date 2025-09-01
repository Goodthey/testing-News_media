import React from "react";
import { Card, Tag, Typography, Space } from "antd";
import { LikeFilled, DislikeFilled } from "@ant-design/icons";
import type { NewsItemProps } from "./NewsCard.type";
import styles from "./NewsCard.module.css";
import { useAppDispatch } from "@/shared/hooks";
import { toggleReaction } from "@/entities/news/model/slice";

const { Title, Paragraph } = Typography;

export const NewsCard: React.FC<NewsItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleReaction = (reaction: "like" | "dislike") => {
    dispatch(toggleReaction({ id: item.id, reaction }));
  };

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
            {item.tags.map((tag: string) => (
              <Tag key={tag} className={styles.newsTag}>
                {tag}
              </Tag>
            ))}
          </div>

          <div className={styles.reactionsContainer}>
            <Space size="middle">
              <span
                className={`${styles.reaction} ${styles.like} ${
                  item.userReaction === "like" ? styles.activeLike : ""
                }`}
                onClick={() => handleReaction("like")}
                style={{ cursor: "pointer" }}
              >
                <LikeFilled />
                <span className={styles.count}>{item.reactions.likes}</span>
              </span>
              <span
                className={`${styles.reaction} ${styles.dislike} ${
                  item.userReaction === "dislike" ? styles.activeDislike : ""
                }`}
                onClick={() => handleReaction("dislike")}
                style={{ cursor: "pointer" }}
              >
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
