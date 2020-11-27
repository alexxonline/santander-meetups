import Link from "next/link";
import Layout from "../components/system/Layout";
import Card from "../components/system/Card";
import styles from "../styles/Meetups.module.scss";
import { listAllMeetups } from "../services/meetups.service";

export default function Meetups() {
  const meetups = listAllMeetups();
  const meetupsRows = meetups.map(meetup => {
    return (
      <Link href={`meetup?id=${meetup.id}`}>
      <tr>
        <td>{meetup.formattedDate}</td>
        <td>{meetup.title}</td>
        <td>{meetup.participants.length}</td>
      </tr>
    </Link>
  );
  });


  return (
    <Layout>
      <div className="content">
        <h2 className="title">Lista de meetups</h2>
        <Card>
          <div className={styles.meetups}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Nombre</th>
                  <th>Cantidad de asistentes</th>
                </tr>
              </thead>
              <tbody>
                {meetupsRows}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
