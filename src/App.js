import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { FaDownload } from "react-icons/fa";
import Recipe from "./Recipe";
import Tags from "./Tags";
import recipes from "./recipes.json";
import tags from "./tags.json";
import styles from "./App.module.css";

const App = () => {
  const [annotations, setAnnotations] = useLocalStorage(
    "annotations",
    Array.from({ length: recipes.length }),
  );
  const [pointer, setPointer] = useState(annotations.length);
  const [checked, setChecked] = useState(() => {
    const accept = annotations.at(pointer)?.accept;
    return tags.map((tag) => accept?.includes(tag) ?? false);
  });

  document.title = String(pointer / annotations.length).slice(0, 4);

  const handleSubmit = () => {
    const next = (pointer + 1) % recipes.length;
    setAnnotations([
      ...annotations.slice(0, pointer),
      {
        text: recipes.at(pointer).join("\n"),
        accept: tags.filter((_, i) => checked[i]),
      },
      ...annotations.slice(next),
    ]);
    setPointer(next);
    setChecked(() => {
      const accept = annotations.at(next)?.accept;
      return tags.map((tag) => accept?.includes(tag) ?? false);
    });
  };

  const download = () => {
    const blob = new Blob(
      [
        annotations
          .map((a) => {
            a.options = tags.map((tag) => ({ id: tag, text: tag }));
            a.config = { choice_style: "multiple" };
            return JSON.stringify(a);
          })
          .join("\n"),
      ],
      {
        type: "application/jsonl",
      },
    );

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "annotations.jsonl";

    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    });

    a.dispatchEvent(event);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Recipe instructions={recipes.at(pointer)} handleClick={handleSubmit} />
        <Tags tags={tags} checked={checked} setChecked={setChecked} />
      </div>
      <button className={styles.button} onClick={download}>
        <FaDownload />
      </button>
    </div>
  );
};

export default App;
