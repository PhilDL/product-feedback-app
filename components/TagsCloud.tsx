import React from "react";
import Tag from "./UI/Tag";
import Card from "./UI/Card";
import type { Category } from "../types/database";

export type TagsCloudProps = {
  tags: Category[];
  selectedCategoryId?: number | null;
  onChangeCategory: (id: number | null) => void;
  className?: string;
};

const TagsCloud: React.FC<TagsCloudProps> = ({
  tags,
  selectedCategoryId = null,
  onChangeCategory,
  className,
}: TagsCloudProps) => {
  return (
    <Card className={`flex-wrap gap-x-2 gap-y-3 ${className}`}>
      <Tag
        onClick={() => onChangeCategory(null)}
        selected={
          selectedCategoryId === null ||
          tags.filter((t) => t.id === selectedCategoryId).length === 0
            ? true
            : false
        }
      >
        All
      </Tag>
      {tags.map((tag) => (
        <Tag
          key={tag.slug}
          onClick={() => onChangeCategory(tag.id)}
          selected={tag.id === selectedCategoryId}
        >
          {tag.name}
        </Tag>
      ))}
    </Card>
  );
};
export default TagsCloud;
