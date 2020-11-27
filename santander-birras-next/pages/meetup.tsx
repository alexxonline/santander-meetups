import Layout from "../components/system/Layout";
import Card from "../components/system/Card";
import Button from "../components/system/Button";
import { getMeetup } from "../services/meetups.service";
import styles from "../styles/Meetup.module.scss";

export default function Meetup() {
  const meetup = getMeetup("4");
  const temperatureAndBeer = {
    temperature: 24,
    beerBoxCount: 4,
    relationByPerson: 2
  };
  
  const boxWord = temperatureAndBeer.beerBoxCount > 1 ? 'cajas' : 'caja';
  const beerWordRelation = temperatureAndBeer.relationByPerson > 1 ? 'birras' : 'birra';

  return (
    <Layout>
      <div className="content">
        <h2 className="title">{meetup.title}</h2>
        <Card>
          <div className={styles.meetup}>
            <p>{meetup.description}</p>
            <p>
              <span>Fecha: </span>
              {meetup.formattedDate}
            </p>
            <div className={styles.buttonContainer}>
              <Button onClick={() => {}}>Inscribirse</Button>
            </div>
          </div>
          <div className={styles.adminContainer}>
            <div className={styles.admin}>
              <p>El día de la meetup haran <span className={styles.highlightText}>{temperatureAndBeer.temperature}°C </span>
              y vamos  a necesitar al menos <span className={styles.highlightText}>{temperatureAndBeer.beerBoxCount} {boxWord}</span> de 6 birras por persona.  </p>
              <p>Se toma como relación <span className={styles.highlightText}>{temperatureAndBeer.relationByPerson} {beerWordRelation} </span> por persona.</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
