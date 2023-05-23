import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import NewCardForm from "./NewCardForm";

function AddCardPage() {
  const history = useHistory();
  const { deckId } = useParams(); 
  const [currentDeck, setCurrentDeck] = useState({});


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
      } catch (error) {
        if (error.name === "AbortError")
          console.log("Aborted Load Single Deck");
        else throw error;
      }
    }

    loadDeck();
    return () => {
      abortController.abort(); 
    };
  }, [deckId]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    async function create() {
      setFormData({ ...initialFormState }); 
      await createCard(deckId, formData);
    }
    create();

  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <p className="breadcrumb">
            <Link to="/">
              <i className="bi bi-house-door"></i>&nbsp;Home
            </Link>
            &nbsp;/&nbsp;
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
            &nbsp;/ Add Card
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>{currentDeck.name}:</h3>
          <h3>Add Card</h3>
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

export default AddCardPage;
