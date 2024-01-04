import ListItem from "./ListItem";
import styles from "./styles.module.scss";

export default function List({ sizes, subCategories, setSizes }) {

  console.log(subCategories)
  return (
    <ul className={styles.list}>
      {sizes.map((sub) => (
        <ListItem
          subCategory={sub}
          key={sub._id}
          setSubCategories={setSizes}
          categories={subCategories}
        />
      ))}
    </ul>
  );
}
