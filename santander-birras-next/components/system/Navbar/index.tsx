import styles from "./Navbar.module.scss";
import Menu from '../Menu';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout } = useAuth0();

  const exit = () => {
    logout({ returnTo: "https://meetups.alexsaez.net"});
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  const imagePath = isMenuOpen ? './images/close.svg' : './images/hamburger-menu.svg';

  return (
    <>
    <div className={styles.navbar}>
      <div className={styles.openMenuContainer} onClick={toggleMenu}>
      <img
        className={styles.openMenu}
        src={imagePath}
        alt="Abrir menú"
      />
      <span className={styles.menuTitle}>Menú</span>
      </div>
      <div>
        <span className={"logo " + styles.logo}>M</span>
        <span className={"logo " + styles.logoFull}>eetups</span>
      </div>
      <img className={styles.exit} src="./images/shutdown.svg" alt="Salir" onClick={exit} />
    </div>
    <Menu isOpen={isMenuOpen} closeCallback={closeMenu} />
    </>
    
  );
}
