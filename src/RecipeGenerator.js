import React, { useState } from 'react';

export const RecipeGenerator = () => {
    const [ingredients, setIngredients] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [dietaryRestrictions, setDietaryRestrictions] = useState("");
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false); 
    const createRecipe = async () => {
        try {
            setLoading(true); 
            setRecipe(""); 
            const response = await fetch(`https://recipe-generator-s00u.onrender.com/api/recipes/generate?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestrictions=${dietaryRestrictions}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();
            setRecipe(data);
        } catch (error) {
            console.error("Error generating recipe:", error);
            setRecipe("Failed to generate recipe. Please try again.");
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <h2>NICK'S RECIPE GENERATOR</h2>
            
            <input 
                type='text' 
                placeholder='Enter ingredients (comma separated)' 
                value={ingredients} 
                onChange={(e) => setIngredients(e.target.value)} 
            />

            <input 
                type='text' 
                placeholder='Enter cuisine' 
                value={cuisine} 
                onChange={(e) => setCuisine(e.target.value)} 
            />

            <input 
                type='text' 
                placeholder='Enter dietary restrictions' 
                value={dietaryRestrictions} 
                onChange={(e) => setDietaryRestrictions(e.target.value)} 
            />

            <button onClick={createRecipe}>Create</button>

            <div className='output'>
                {loading ? (
                    <pre className='recipe-text'>Please wait until the chef responds...</pre>
                ) : (
                    <pre className='recipe-text'>{recipe}</pre>
                )}
            </div>
        </div>
    );
};
