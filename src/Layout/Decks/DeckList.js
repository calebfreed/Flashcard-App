import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"

import { listDecks, deleteDeck } from "../../utils/api";


function DeckList() {

    const [decks, setDecks] = useState([]);
    const history = useHistory()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        async function showDecks() {
            try {
                const deckList = await listDecks(signal)
                setDecks(deckList)
            } catch (error) {
                console.log(error)
            }
        }

        showDecks();

        return (() => abortController.abort())
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this deck?")) {
            const abortController = new AbortController();
            const signal = abortController.signal
            async function deleteDecks() {
                try {
                    await deleteDeck(id, signal)
                    setDecks(decks.filter((deck) => deck.id !== id))
                } catch (error) {
                    if (error.name === "AbortError") console.log("Aborted Load Decks");
                    else throw error
                }
            }

            deleteDecks();

            return () => { abortController.abort() }
        }
    };

    const list = decks.map((deck, index) => {
        return (
            <div key={index} className="card card-width">
                <div className="card-body">
                    <div className="card-count">
                        <p>{`${deck.cards.length} cards`}</p>
                    </div>
                    <div>
                        <h4>{deck.name}</h4>
                    </div>
                    <p>{deck.description}</p>
                </div>
                <div className="card-footer">
                    <Link to={`/decks/${deck.id}`} className="btn btn-margin btn-secondary">
                        View
                    </Link>
                    <Link to={`/decks/${deck.id}/study`} className="btn btn-margin btn-primary">
                        Study
                    </Link>
                    <button
                        onClick={() => handleDelete(deck.id)}
                        className="btn btn-danger delete-btn">
                        Delete
                    </button>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="col">
                <Link
                    to="/decks/new"
                    className="btn btn-primary">
                    Create Deck
                </Link>
            </div>
            {list}
        </>
    )

}


export default DeckList