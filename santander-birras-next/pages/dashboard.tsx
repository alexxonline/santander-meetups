import Link from "next/link";
import Layout from "../components/system/Layout";
import Card from "../components/system/Card";
import Loading from "../components/system/Loading";
import { getNextThreeMeetups } from "../services/meetups.service";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "../styles/Dashboard.module.scss";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [meetups, setMeetups] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  let meetupsComponents;

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://alex-meetups.vercel.app/api",
          scope: "read:all write:all"
        });
      
        const meetups = await getNextThreeMeetups(accessToken);
        setMeetups(meetups);
        setIsLoading(false);
      } catch (err) {
        throw err;
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  meetupsComponents = meetups.map((meetup) => {
    return (
      <Card key={meetup.id}>
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
          {!isLoading && !isError ? meetupsComponents : ""}
          {isLoading ? (
            <Card>
              <div className="center">
                <Loading size="large" />
              </div>
            </Card>
          ) : (
            ""
          )}
          {isError ? (
            <Card>Ocurrió un error intentando cargar las meetups.</Card>
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
}
