import styles from "./Tag.module.css";

const Tag = ({ tag, checked, handleClick }) => {
  return (
    <label key={tag} className={styles.container}>
      <input
        id={tag}
        type="checkbox"
        className={styles.box}
        checked={checked}
        onChange={handleClick}
        value={tag}
      />
      {tag}
    </label>
  );
};

export default Tag;
