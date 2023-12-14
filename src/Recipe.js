import styles from "./Recipe.module.css";
import React from "react";

const Recipe = ({ instructions, handleClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        {instructions.map((instruction, index) => (
          <React.Fragment key={index}>
            <span>{instruction}</span>
            <hr />
          </React.Fragment>
        ))}
      </div>
      <button type="submit" className={styles.button} onClick={handleClick}>
        Seuraava
      </button>
    </div>
  );
};

export default Recipe;
