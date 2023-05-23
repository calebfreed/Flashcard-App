import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readDeck } from "../../utils/api";

function StudyDeck() {
  const { deckId } = useParams();

  const history = useHistory();
  const deckUrl = `/decks/${deckId}`;

  const [cardState, setCardState] = useState({ index: 0, flip: false });
  const [currentDeck, setCurrentDeck] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        const deck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(deck);
      } catch (error) {
        if (error.name === "AbortError")
          console.log("Aborted");
        else throw error;
      }
    }

    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [deckId]);


  const flipCard = (id) => {
    setCardState({ ...cardState, flip: !cardState.flip });
  };

  const next = (id) => {
    if (
      cardState.index >= currentDeck.cards.length - 1 &&
      window.confirm(
        "Restart your study session?"
      )
    ) {
      setCardState({ index: 0, flip: false });
    } else if (cardState.index < currentDeck.cards.length - 1) {
      setCardState({ index: cardState.index + 1, flip: false });
    } else {
      history.push("/");
    }
  };

  const cardList = () => {
    if (currentDeck.cards) {
      if (currentDeck.cards.length >= 3) {
        return (
          <div className="card card-width" >
            <div className="card-body">
              <h4 className="card-text">
                Card {cardState.index + 1} of {currentDeck.cards.length}
              </h4>
              <p>
                {cardState.flip
                  ? currentDeck.cards[cardState.index].back
                  : currentDeck.cards[cardState.index].front}
              </p>
            </div>
            <div className="card-footer">
              <button
                onClick={() => flipCard(currentDeck.cards[cardState.index].id)}
                className="btn btn-margin btn-secondary"
              >
                Flip
              </button>
              {cardState.flip && (
                <button
                  onClick={() => next(currentDeck.cards[cardState.index].id)}
                  className="btn btn-margin btn-primary"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <h3>Not enough cards.</h3>
            <p>
              You need at least 3 cards to study. There are{" "}
              {currentDeck.cards.length} cards in this deck.
            </p>
            <Link to={`${deckUrl}/cards/new`} className="btn btn-primary">
              Add Cards
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <p className="breadcrumb">
            <Link to="/">Home</Link>&nbsp;/&nbsp;
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>&nbsp;/
            Study
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>{currentDeck.name}: Study</h2>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex">{cardList()}</div>
      </div>
    </>
  );
}

export default StudyDeck;
