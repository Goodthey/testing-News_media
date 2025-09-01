export const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

export const formatTag = (tag: string): string => {
  return tag.charAt(0).toUpperCase() + tag.slice(1);
};
