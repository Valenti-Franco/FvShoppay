import ListItem from "./ListItem";
import styles from "./styles.module.scss";

export default function List({ categories, setCategories }) {
  return (
    <ul className={styles.list}>
      {categories.map((category) => (
        <ListItem
          category={category}
          key={category.id}
          setCategories={setCategories}
        />
      ))}
    </ul>
  );
}
