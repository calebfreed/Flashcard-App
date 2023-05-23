import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard, } from "../../utils/api";

import NewCardForm from "./NewCardForm";

function EditCard() {

  const { deckId, cardId } = useParams(); 
  const [currentDeck, setCurrentDeck] = useState({});
  const history = useHistory();

  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });


  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(deck);

        console.log("Loaded deck", deck);
      } catch (error) {
        if (error.name === "AbortError")
          console.log("Aborted");
        else throw error;
      }
    }

    loadDeck();

    return () => {
      console.log("Cleaned up");
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadCards() {
      try {
        const card = await readCard(cardId, abortController.signal);
        setFormData({ ...card });
      } catch (error) {
        if (error.name === "AbortError")
          console.log("Aborted");
        else throw error;
      }
    }

    loadCards();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    async function create() {
      setFormData({ ...initialFormState });
      await updateCard(formData);
      history.push(`/decks/${deckId}`);
    }
    create();
  };

  const handleChange = ({ event }) => {
    setFormData({
      ...formData,
      [event.name]: event.value,
    });
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <p className="breadcrumb">
            <Link to="/">
              Home
            </Link>
            &nbsp;/&nbsp;
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
            &nbsp;/ Edit Card {cardId}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Edit Card</h3>
          <NewCardForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCancel={handleCancel}
            formData={formData}
          />
        </div>
      </div>
    </>
  );
}

export default EditCard;
