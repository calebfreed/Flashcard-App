import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import DeckForms from "./DeckForms";

function EditDeck() {
  const { deckId } = useParams(); 
  const history = useHistory()
  
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [currentDeck, setCurrentDeck] = useState({});


  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(deck);
        setFormData({ name: deck.name, description: deck.description });
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
  }, []);

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
      const { id } = await updateDeck({ id: deckId, ...formData });
      history.push(`/decks/${id}`);
    }
    create();
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
            &nbsp;/ Edit Deck
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Edit Deck</h2>
          <DeckForms
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCancel={handleCancel}
            formData={formData}
          />
        </div>
      </div>
    </>
  );
}

export default EditDeck;
