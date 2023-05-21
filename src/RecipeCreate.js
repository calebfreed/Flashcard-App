import React, { useState } from "react";

function RecipeCreate({ createRecipe }) {
  
   const clearForms = {
    name: "",
    cuisine: "",
    photo: "",
    ingredients: "",
    preparation: "",
  };
  
  const [foodForm, setFoodForm] = useState({ ...clearForms });

  const handleChange = ({ target }) => {
    setFoodForm({ ...foodForm, [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createRecipe({ ...foodForm });
    setFoodForm({ ...clearForms });
  };
  
  

  return (
    <form onSubmit={handleSubmit} name="create">
      <table>
        <tbody>
          <tr>
            <td>
              <input
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={foodForm.name}
              />
            </td>
            <td>
              <input
                id="cuisine"
                type="text"
                name="cuisine"
                onChange={handleChange}
                value={foodForm.cuisine}
              />
            </td>
            <td>
              <input
                id="photo"
                type="url"
                name="photo"
                onChange={handleChange}
                value={foodForm.photo}
              />
            </td>
            <td>
              <textarea
                id="ingredients"
                type="text"
                name="ingredients"
                rows={2}
                onChange={handleChange}
                value={foodForm.ingredients}
              />
            </td>
            <td>
              <textarea
                id="preparation"
                type="text"
                name="preparation"
                rows={2}
                onChange={handleChange}
                value={foodForm.preparation}
              />
            </td>
            <td>
              <button type="submit">Create</button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default RecipeCreate;
