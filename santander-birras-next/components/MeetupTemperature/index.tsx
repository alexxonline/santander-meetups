import { TemperatureAndBeer } from "../../models/temperatureAndBeer.model";
import styles from "./MeetupTemperature.module.scss";

export interface MeetupTemperatureProps {
  temperatureAndBeer: TemperatureAndBeer;
}

export default function MeetupTemperature({
  temperatureAndBeer,
}: MeetupTemperatureProps) {
  const boxWord = temperatureAndBeer.beerBoxCount > 1 ? "cajas" : "caja";
  const beerWordRelation =
    temperatureAndBeer.relationByPerson > 1 ? "birras" : "birra";

  return (
    <div>
      {temperatureAndBeer.success ? (
        <>
          <p>
            El día de la meetup harán{" "}
            <span className={styles.highlightText}>
              {temperatureAndBeer.temperature}°C{" "}
            </span>
            y vamos a necesitar al menos{" "}
            <span className={styles.highlightText}>
              {temperatureAndBeer.beerBoxCount} {boxWord}
            </span>{" "}
            de 6 birras por persona.{" "}
          </p>
          <p>
            Se toma como relación{" "}
            <span className={styles.highlightText}>
              {temperatureAndBeer.relationByPerson} {beerWordRelation}{" "}
            </span>{" "}
            por persona.
          </p>
        </>
      ) : (
        <p>No hay información de clima para este día aún, no podemos calcular cuantas cervezas se van a tomar.</p>
      )}
    </div>
  );
}
