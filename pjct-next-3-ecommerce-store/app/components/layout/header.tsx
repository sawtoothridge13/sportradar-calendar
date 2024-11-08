import '../../styles/globals.scss';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/header.module.scss';
import { getCartItemsWithPrice } from '../cart/getCartItemsWithPrice';

export default async function Header() {
  const cartItems = await getCartItemsWithPrice();
  const totalQuantity = cartItems
    .map((cartItem) => {
      return cartItem.quantity;
    })
    .reduce((total, singleItemQuantity) => total + singleItemQuantity, 0);

  return (
    <header>
      <nav className={styles.headerNav}>
        <div className={styles.headerLogoBox}>
          <Link href="/">
            <Image
              priority={true}
              src="/images/devbevslogo.png"
              alt="devbevs logo"
              width="200"
              height="250"
            />
          </Link>
        </div>

        <div className={styles.headerLinkBox}>
          <div>
            <Link className={styles.headerLink} href="/about">
              About
            </Link>
          </div>
          <div>
            <Link
              className={styles.headerLink}
              href="/products"
              data-test-id="products-link"
            >
              Products
            </Link>
          </div>
          <div>
            <Link
              className={styles.headerCartLink}
              href="/cart"
              data-test-id="cart-link"
            >
              <Image
                className={styles.headerCartLogo}
                src="/images/shopping-cart.png"
                alt="cart icon"
                width="75"
                height="75"
              />
              {totalQuantity !== 0 ? (
                <div className={styles.circle} data-test-id="cart-count">
                  {totalQuantity}
                </div>
              ) : null}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
