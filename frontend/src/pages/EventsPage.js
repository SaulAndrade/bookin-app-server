import React, { useCallback, useState, useContext } from "react";
import useEvents from "../hooks/use-events";

import authContext from "../context/auth-context";

import Backdrop from "../components/UI/Backdrop";
import Modal from "../components/UI/Modal";
import Button from "../components/UI/Button";
import Spinner from "../components/UI/Spinner";
import CreateEventForm from "../components/CreateEventForm/CreateEventForm";

import classes from "./EventsPage.module.css";
import EventsList from "../components/EventsList/EventsList";

const EventsPage = () => {
  const { createEvent, deleteEvent, events } = useEvents();
  const { userInfo } = useContext(authContext);
  const { token } = userInfo;

  const [showModal, setShowModal] = useState(false);
  const [submitCreateEventForm, setSubmitCreateEventForm] = useState(false);
  const [opLoading, setOpLoading] = useState(false);

  const cancelModalHandler = () => {
    setShowModal(false);
    setSubmitCreateEventForm(false);
  };

  const confirmModalHandler = async () => {
    setSubmitCreateEventForm(true);
  };

  const createEventHandler = useCallback(
    async (title, desc, price, date) => {
      setSubmitCreateEventForm(false);
      setOpLoading(true);

      const result = await createEvent(title, desc, price, date);

      console.log(result.msg);

      setOpLoading(false);
      cancelModalHandler();
    },
    [createEvent]
  );
   
  return (
    <React.Fragment>
      <Backdrop show={showModal} clicked={cancelModalHandler} />
      <Modal
        title="Novo Evento"
        show={showModal}
        canCancel
        canConfirm
        confirmText='confirmar'
        onCancel={cancelModalHandler}
        onConfirm={confirmModalHandler}
      >
        {!opLoading ? (
          <CreateEventForm
            onSubmit={createEventHandler}
            shouldSubmit={submitCreateEventForm}
          />
        ) : (
          <Spinner />
        )}
      </Modal>

      {token && (
        <div className={classes.EventsControl}>
          <p>Compartilhe seus eventos!</p>
          <Button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Create Event
          </Button>
        </div>
      )}

      {events.length>0 ? (
        <EventsList events={events} deleteEvent={deleteEvent} />
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

export default EventsPage;
