import '../styles/globals.scss';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts, Product } from '../../database/products';
import styles from '../styles/productspage.module.scss';

export const metadata = {
  title: 'Products',
  description: 'Choose your product',
};

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <main className={styles.main}>
      <h1>&#123;devBevs&#125;</h1>

      <section className={styles.products}>
        {products.map((product: Product) => {
          // map through product database and return all products
          return (
            <div
              key={`product-div-${product.id}`}
              className={styles.productCard}
            >
              <Link
                href={`/products/${product.id}`}
                data-test-id={`product-${product.id}`}
              >
                <h4 className={styles.productInfo}>{product.name}</h4>
                <figure className={styles.productImage}>
                  <Image
                    alt={product.alt}
                    src={`/images/${product.alt.toLowerCase()}.png`}
                    width="350"
                    height="350"
                  />
                </figure>
                <figcaption className={styles.productInfo}>
                  <h5>{product.price} €</h5>
                </figcaption>
              </Link>
            </div>
          );
        })}
      </section>
    </main>
  );
}
