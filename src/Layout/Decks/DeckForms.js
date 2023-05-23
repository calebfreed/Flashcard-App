import React from "react"

function DeckForms({ handleSubmit, handleChange, formData, handleCancel }) {
    return (
        <>
            <div className="form-group container">
                <form onSubmit={handleSubmit}>
                    <label
                        className="row form-label"
                        htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="form-control"
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        placeholder="Please Name your Deck"
                        rows="1"
                    />

                    <label
                        className="row form-label"
                        htmlFor="name">
                        Description:
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        type="text"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        placeholder="Please add a Description for your Deck"
                        rows="5"
                    />
                </form>
            </div>

            <button
                className="btn btn-margin btn-secondary"
                type="cancel"
                onClick={handleCancel}>
                Cancel
            </button>

            <button
                className="btn btn-margin btn-primary mr-1"
                type="submit"
                onClick={handleSubmit}>
                Submit
            </button>
        </>
    )
}
export default DeckForms