import { ToastContainer } from "react-toastify";
import styles from "../../../../styles/products.module.scss";
import Layout from "../../../ui/admin/layout";
import ProductCard from "../../../ui/admin/products/productCard";
import axios from "axios";

export default async function all() {
  const Products = await axios.get(
    `https://fvecommerce.somee.com/api/Productos?pagina=1&tamanoPagina=1000`
  );

  const products = Products.data;

  return (
    <Layout>
      <div className={styles.header}>All Products</div>
      <ToastContainer />

      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </Layout>
  );
}
