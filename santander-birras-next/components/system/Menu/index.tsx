import Link from 'next/link'
import styles from './Menu.module.scss';


export interface MenuProperties {
  isOpen: boolean;
  closeCallback: () => void;
}

export default function Menu({isOpen, closeCallback}: MenuProperties) {
  const menuClassName = isOpen ? `${styles.open} ${styles.menu}` : styles.menu;
  const closeMenu = () => {
    closeCallback();
  }
  return (
    <>
    {isOpen ? <div className={styles.overlay}></div> : ''}
    <div className={menuClassName}>
      <div className={styles.closeMenu} onClick={closeMenu}><img src="./images/close.svg" alt="Cerrar" /><span>Cerrar menu</span></div>
      <ul className={styles.menuList}>
        <li>
          <Link href="/dashboard">
            <a>Inicio</a>
          </Link>
        </li>
        <li>
          <Link href="/meetups">
            <a>Meetups</a>
          </Link>
        </li>
        <li>
          <Link href="/nueva-meetup">
            <a>Nueva meetup</a>
          </Link>
        </li>
      </ul>
    </div>
    </>
  )
}