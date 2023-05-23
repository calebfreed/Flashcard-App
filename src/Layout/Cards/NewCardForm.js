import React from "react";
import { useParams, Link } from "react-router-dom";


function NewCardForm({ handleSubmit, handleImDone, handleChange, formData, handleCancel }) {
    const { deckId } = useParams();

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="front">Front</label>

                <textarea
                    className="form-control"
                    id="front"
                    name="front"
                    onChange={handleChange}
                    value={formData.front}
                    placeholder="Front of card"
                />
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>

                <textarea
                    className="form-control"
                    id="back"
                    name="back"
                    onChange={handleChange}
                    value={formData.back}
                    placeholder="Back of card"
                />
                <br />
            </div>

            <button
                className="btn btn-margin btn-secondary"
                onClick={handleCancel}
            >
                Cancel
            </button>

            <button
                className="btn btn-margin btn-primary"
                type="submit"

            >
                Submit
            </button>

            <Link to={`/decks/${deckId}`} className="btn btn-margin btn-success">
                Done Adding Cards
            </Link>

        </form>
    );
}

export default NewCardForm;
