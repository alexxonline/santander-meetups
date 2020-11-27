import Link from "next/link";
import Layout from "../components/system/Layout";
import Card from "../components/system/Card";
import { getNextThreeMeetups } from "../services/meetups.service";
import styles from "../styles/Dashboard.module.scss";

export default function Dashboard() {
  const meetups = getNextThreeMeetups();
  const meetupsComponents = meetups.map((meetup) => {
    return (
      <Card>
        <Link href={`meetup?id=${meetup.id}`}>
          <div className={styles.meetup}>
            <h3>{meetup.title}</h3>
            <p>{meetup.description}</p>
            <p>Fecha: {meetup.formattedDate}</p>
          </div>
        </Link>
      </Card>
    );
  });
  return (
    <Layout>
      <div className="dashboard">
        <div className={styles.hero}>
          <div className={styles.heroInner}>
            <h1>¡Enterate de lo último con nuestras meetups!</h1>
            <p>
              Con nuestras meetups podés aprender algo nuevo y al mismo tiempo
              disfrutar de unas buenas birras.
            </p>
          </div>
        </div>
        <div className="content">
          <h2 className="sectionTitle">Proximas meetups</h2>
          {meetupsComponents}
        </div>
      </div>
    </Layout>
  );
}
