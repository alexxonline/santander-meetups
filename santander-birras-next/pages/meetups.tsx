import Link from "next/link";
import Layout from "../components/system/Layout";
import Card from "../components/system/Card";
import { listAllMeetups } from "../services/meetups.service";
import Loading from "../components/system/Loading";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "../styles/Meetups.module.scss";

export default function Meetups() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [meetups, setMeetups] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  
  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://alex-meetups.vercel.app/api",
          scope: "read:all write:all"
        });
      
        const meetups = await listAllMeetups(true, accessToken);
        setMeetups(meetups);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);
  const meetupsRows = meetups.map((meetup) => {
    return (
      <Link key={meetup.id} href={`meetup?id=${meetup.id}`}>
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
          {!isLoading && !isError ? (
            <div className={styles.meetups}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Cantidad de asistentes</th>
                  </tr>
                </thead>
                <tbody>{meetupsRows}</tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          {isLoading ? (
            <div className="center">
              <Loading size="large" />
            </div>
          ) : (
            ""
          )}
          {isError ? (
            <p>Ocurrió un error intentando cargar las meetups.</p>
          ) : (
            ""
          )}
        </Card>
      </div>
    </Layout>
  );
}
