import React from "react";
import Tag from "./UI/Tag";
import Card from "./UI/Card";
import type { Category } from "../types/database";

type Props = {
  tags: Category[];
  selectedTag?: string;
};

const TagsCloud: React.FC<Props> = ({ tags, selectedTag }: Props) => {
  return (
    <Card className="flex-wrap gap-x-2 gap-y-3">
      <Tag
        href="#"
        selected={
          selectedTag === null ||
          tags.filter((t) => t.slug === selectedTag).length === 0
            ? true
            : false
        }
      >
        All
      </Tag>
      {tags.map((tag) => (
        <Tag key={tag.slug} href={tag.slug} selected={tag.slug === selectedTag}>
          {tag.name}
        </Tag>
      ))}
    </Card>
  );
};
export default TagsCloud;
