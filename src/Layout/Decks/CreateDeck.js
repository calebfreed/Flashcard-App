import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { createDeck } from "../../utils/api/index"
import DeckForms from "./DeckForms";

function CreateDeck() {
    //sets the initial form to be blank
    const history = useHistory();

    const initialFormState = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        async function newDeck() {
            setFormData({ ...initialFormState });
            const { id } = await createDeck(formData)
            console.log(id)
            history.push(`/decks/${id}`)
        }
        newDeck()
    };

    const handleCancel = () => {
        setFormData("");
        history.push("/")
    };

    return (
        <>
            <div className="row container">
                <div className="col">
                    <p className="breadcrumb">
                        <Link to="/">
                            Home
                        </Link>
                        &nbsp;/ Create Deck
                    </p>
                </div>
            </div>

            <div className="row container">
                <div className="col">
                    <h2>Create Deck</h2>
                    <DeckForms
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleCancel={handleCancel}
                        formData={formData}
                    />
                </div>
            </div>

        </>

    )
}

export default CreateDeck