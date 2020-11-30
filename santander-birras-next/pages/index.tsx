import styles from "../styles/Home.module.scss";
import Button from "../components/system/Button";
import { useRouter } from 'next/router'
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { loginWithRedirect } = useAuth0();
  const router = useRouter();
  const login = () => {
    loginWithRedirect();
  }

  return (
    <div className={styles.home}>
      <div className={styles.logoContainer}>
        <h1 className="logo">Meetups</h1>
      </div>
      <h1 className={styles.hero}>
        Hola :) <br /> Bienvenido a <br /> meetups{" "}
      </h1>
      <div className={styles.imgContainer}>
        <img
          src="/images/landing-illustration.svg"
          alt="Una ilustración de personas tomando cerveza."
        />
      </div>
      <div className={styles.buttonContainer}>
        <h2>
          Ingresá desde acá para conocer y registrarte en tu proxima meetup
        </h2>
        <Button onClick={login}>Ingresar</Button>
      </div>
    </div>
  );
}
