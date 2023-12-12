import React, { useEffect, useState } from "react";
import Tag from "./Tag";
import styles from "./Tags.module.css";

const Tags = ({ tags, checked, setChecked }) => {
  const [results, setResults] = useState(tags);
  const [value, setValue] = useState(String.prototype);

  useEffect(() => {
    const filtered = tags.filter((tag) => tag.includes(value));
    setResults(filtered);
  }, [value, tags]);

  const handleClick = (index) => {
    const copy = Array.from(checked);
    copy[index] = !copy[index];
    setChecked(copy);
  };

  return (
    <div className={styles.container}>
      <input
        id="search"
        className={styles.search}
        type="search"
        placeholder="Hae ainesosaa..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={styles.content}>
        {tags
          .map((tag, index) => ({ tag, checked: checked[index], index }))
          .filter(({ tag }) => results.includes(tag))
          .sort((a, b) => b.checked - a.checked)
          .map(({ tag, checked, index }) => (
            <React.Fragment key={tag}>
              <Tag
                tag={tag}
                checked={checked}
                handleClick={() => handleClick(index)}
              />
              <hr />
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Tags;
