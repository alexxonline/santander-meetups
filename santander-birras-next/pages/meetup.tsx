import Layout from "../components/system/Layout";
import Button from "../components/system/Button";
import Card from "../components/system/Card";
import Loading from "../components/system/Loading";
import MeetupTemperature from "../components/MeetupTemperature";
import { getMeetup, getTempAndBeer } from "../services/meetups.service";
import styles from "../styles/Meetup.module.scss";
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Meetup } from "../models/meetup.model";
import { TemperatureAndBeer } from "../models/temperatureAndBeer.model";
import { registerInMeetup } from "../services/participants.service";

export default function MeetupComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [meetup, setMeetup] = useState<Meetup>();
  const [tempAndBeer, setTempAndBeer] = useState<TemperatureAndBeer>();
  const { getAccessTokenSilently, user } = useAuth0();

  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://alex-meetups.vercel.app/api",
          scope: "read:all write:all",
        });
        console.log("user is: ", user);

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const meetup = await getMeetup(id, accessToken);
        const tempAndBeer = await getTempAndBeer(id, accessToken);
        setMeetup(meetup);
        setTempAndBeer(tempAndBeer);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    })();
  }, []);

  const registerInMeetupAction = async () => {
    setIsRegisterLoading(true);
    const accessToken = await getAccessTokenSilently({
      audience: "https://alex-meetups.vercel.app/api",
      scope: "read:all write:all",
    });

    await registerInMeetup(meetup.id, accessToken, user);
    setIsRegisterLoading(false);
  };

  return (
    <Layout>
      <div className="content">
        <h2 className="title">{!isLoading && !isError ? meetup.title : ""}</h2>
        <Card>
          {!isLoading && !isError ? (
            <>
              <div className={styles.meetup}>
                <p>{meetup.description}</p>
                <p>
                  <span>Fecha: </span>
                  {meetup.formattedDate}
                </p>
                <div className={styles.buttonContainer}>
                  {isRegisterLoading ? (
                    <Loading size="large" />
                  ) : (
                    <Button onClick={registerInMeetupAction}>
                      Inscribirse
                    </Button>
                  )}
                </div>
              </div>
              <div className={styles.adminContainer}>
                <div className={styles.admin}>
                  <MeetupTemperature temperatureAndBeer={tempAndBeer} />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
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
            <Card>Ocurrió un error intentando cargar la meetup.</Card>
          ) : (
            ""
          )}
        </Card>
      </div>
    </Layout>
  );
}
