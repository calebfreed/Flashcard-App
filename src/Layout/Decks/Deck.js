import React, { useState, useEffect } from "react";
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

function Deck() {
    const history = useHistory();

    const { url } = useRouteMatch();

    const { deckId } = useParams();

    const [currentDeck, setCurrentDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal
        async function loadDeck() {
            try {
                const deck = await readDeck(deckId, signal);
                setCurrentDeck(deck);
            } catch (error) {
                if (error.name === "AbortError") console.log("Aborted");
                else throw error;
            }
        }

        loadDeck();

        return () => {
            abortController.abort();
        };
    }, []);

    const deleteHandler = (id) => {
        if (
            window.confirm("Are you sure you want to delete this deck?")
        ) {
            const abortController = new AbortController();
            async function deleteId() {
                try {
                    await deleteDeck(id, abortController.signal);
                    history.push("/");
                } catch (error) {
                    if (error.name === "AbortError") console.log("Aborted Load Decks");
                    else throw error;
                }
            }

            deleteId();
            return () => {
                abortController.abort();
            };
        }
    };

    const deleteCardHandler = (id) => {
        if (
            window.confirm("Are you sure you want to delete this card?\n\nYou will not be able to recover it.")
        ) {
            const abortController = new AbortController();
            async function deleteId() {
                try {
                    await deleteCard(id, abortController.signal);
                    setCurrentDeck({
                        ...currentDeck,
                        cards: currentDeck.cards.filter((card) => card.id !== id),
                    });
                } catch (error) {
                    if (error.name === "AbortError") console.log("Aborted Load Card");
                    else throw error;
                }
            }

            deleteId();
            return () => {
                abortController.abort();
            };
        }
    };

    const renderCardList = () => {
        return currentDeck.cards.map((card, index) => {
            return (
                <li key={index} className="list-group-item">
                    <div className="d-flex justify-content-between">
                        <p>{card.front}</p>
                        <p>{card.back}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <Link
                            to={`${url}/cards/${card.id}/edit`}
                            className="btn btn-margin btn-secondary ml-auto"
                        >Edit
                        </Link>
                        <button
                            onClick={() => deleteCardHandler(card.id)}
                            className="btn btn-danger btn-margin"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            );
        });
    };

    return (
        <>
            <div className="row">
                <div className="col">
                    <p className="breadcrumb">
                        <Link to="/">
                        Home
                        </Link>
                        &nbsp;/ {currentDeck.name}
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h4>{currentDeck.name}</h4>
                    <p>{currentDeck.description}</p>
                </div>
            </div>
            <div className="row">
                <div className="col d-flex justify-content-between">
                    <Link to={`${url}/edit`} className="btn btn-margin btn-secondary">
                        Edit
                    </Link>
                    <Link to={`${url}/study`} className="btn btn-margin btn-primary">
                        Study
                    </Link>
                    <Link to={`${url}/cards/new`} className="btn btn-margin btn-primary">
                        Add Cards
                    </Link>
                    <button
                        onClick={() => deleteHandler(currentDeck.id)}
                        className="btn btn-danger delete btn-margin ml-auto"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <hr />
                    <h3>Cards</h3>
                    <div className="card-width">
                            <ul>{currentDeck.cards && renderCardList()}</ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Deck;
