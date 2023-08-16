'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const handleActiveLink = (path) => {
    return path === pathname ? styles.currentlink : styles.link;
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Filmitchos 🍿</h1>

      <nav>
        <ul className={styles.ul}>
          <Link href="/" className={handleActiveLink('/')}>
            Todos os filmes
          </Link>

          <Link href="/favoritos" className={handleActiveLink('/favoritos')}>
            Favoritos
          </Link>
        </ul>
      </nav>
    </header>
  )
}
