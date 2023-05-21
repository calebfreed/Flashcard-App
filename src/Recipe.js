import React from "react";

function Recipe({recipe, deleteRecipe}) {

    return (
        <tr>
            <td>{recipe.name}</td>
            <td>{recipe.cuisine}</td>
            <td><img src={recipe.photo} alt="Photo of Food" /></td>
            <td className="content_td"><p>{recipe.ingredients}</p></td>
            <td className="content_td"><p>{recipe.preparation}</p></td>
            <td><button onClick={deleteRecipe} name="delete">Delete</button></td>
        </tr>
    );
}

export default Recipe;