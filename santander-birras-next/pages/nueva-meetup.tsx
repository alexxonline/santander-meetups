import Button from "../components/system/Button";
import Card from "../components/system/Card";
import Layout from "../components/system/Layout";
import Textfield from "../components/system/Textfield";
import { Meetup } from "../models/meetup.model";
import { CompositeDate } from "../models/compositeDate.model";
import React, { useState, useRef } from "react";
import styles from "../styles/NewMeetup.module.scss";

export default function NewMeetup() {
  const meetupInit: Meetup = {
    id: "",
    description: "",
    formattedDate: "",
    participants: [],
    title: "",
  };

  const monthCtrl = useRef<HTMLInputElement>();
  const yearCtrl = useRef<HTMLInputElement>();
  const hourCtrl = useRef<HTMLInputElement>();
  const minuteCtrl = useRef<HTMLInputElement>();

  const dateInit = new CompositeDate();

  const [meetup, setMeetup] = useState(meetupInit);
  const [date, setDate] = useState(dateInit);

  const handleTitleChange = (event) =>
    setMeetup({ ...meetup, title: event.target.value });
  const handleDescChange = (event) =>
    setMeetup({ ...meetup, description: event.target.value });

  const handleDayChange = (event) => {
    if(isNaN(+event.target.value)) return;
    setDate({...date, day: event.target.value});
    if(event.target.value && event.target.value.length == 2) monthCtrl.current.focus();
  };

  const handleMonthChange = (event) => {
    if(isNaN(+event.target.value)) return;
    setDate({...date, month: event.target.value});
    if(event.target.value && event.target.value.length == 2) yearCtrl.current.focus();
  }

  const handleYearChange = (event) => {
    if(isNaN(+event.target.value)) return;
    setDate({...date, year: event.target.value});
    if(event.target.value && event.target.value.length == 4) hourCtrl.current.focus();
  }

  const handleHourChange = (event) => {
    if(isNaN(+event.target.value)) return;
    setDate({...date, hour: event.target.value});
    if(event.target.value && event.target.value.length == 2) minuteCtrl.current.focus();
  }

  const handleMinuteChange = (event) => {
    if(isNaN(+event.target.value)) return;
    setDate({...date, minute: event.target.value});
  }

  const addClick = () => {
    meetup.formattedDate = CompositeDate.getFormattedDate(date);
    meetup.date = CompositeDate.getDate(date).getTime();
    console.log(meetup);
  };

  return (
    <Layout>
      <div className="content">
        <h2 className="title">Nueva meetup</h2>
        <Card>
          <div className={styles.new}>
            <div className={styles.formControl}>
              <label>Nombre:</label>
              <Textfield
                placeholder="Nombre"
                onChange={handleTitleChange}
                text={meetup.title}
              />
            </div>
            <div className={styles.formControl}>
              <label>Nombre:</label>
              <Textfield
                placeholder="Descripción"
                onChange={handleDescChange}
                text={meetup.description}
              />
            </div>
            <div className={styles.formControl}>
              <label>Fecha:</label>
              <div className={CompositeDate.isValid(date) ? styles.dateControl : `${styles.dateControl} ${styles.invalid}`}>
                <Textfield placeholder="Dia" onChange={handleDayChange} text={date.day} />
                /
                <Textfield placeholder="Mes" onChange={handleMonthChange} text={date.month} ref={monthCtrl} /> /
                <Textfield placeholder="Año" onChange={handleYearChange} text={date.year} ref={yearCtrl} />
                &nbsp;
                <Textfield placeholder="hh" onChange={handleHourChange} text={date.hour} ref={hourCtrl} />:
                <Textfield placeholder="mm" onChange={handleMinuteChange} text={date.minute} ref={minuteCtrl} />
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button onClick={addClick}>Agregar</Button>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
