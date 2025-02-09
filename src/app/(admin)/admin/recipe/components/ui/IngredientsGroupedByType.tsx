// Define TypeScript Types
import React from "react";
import {IngredientType} from "@/lib/definition";


type IngredientsGroupedByTypeProps = {
    ingredients?: IngredientType[]; // Make it optional to avoid errors
};

// Convert JSON into a grouped object
const IngredientsGroupedByType: React.FC<IngredientsGroupedByTypeProps> = ({ ingredients = [] }) => {
    console.log("Ingredients received:", ingredients);

    // Group ingredients by type
    const groupedIngredients = ingredients.reduce((groups, ingredient) => {
        if (!groups[ingredient.ingredientType]) {
            groups[ingredient.ingredientType] = [];
        }
        groups[ingredient.ingredientType].push(ingredient);
        return groups;
    }, {} as Record<string, IngredientType[]>);

    // Ensure groupedIngredients is not null or undefined
    const groupedIngredientsEntries = Object.entries(groupedIngredients);

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "10px", width: "100%" }}>
            {groupedIngredientsEntries.map(([type, ingredients]) => (
                <div key={type} style={{ marginBottom: "1rem" }}>
                    <div style={{ backgroundColor: "#f9fafb", borderRadius: "0.375rem", padding: "1rem" }}>
                        <span style={{ color: "#374151" }}>ប្រភេទ ៖ {type}</span>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.5rem",
                            marginTop: "0.5rem",
                            color: "#374151",
                        }}
                    >
                        {ingredients.map((ingredient) => (
                            <div
                                key={ingredient.ingredientId}
                                style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}
                            >
                                <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <span>{ingredient.ingredientName}</span>
                                </div>
                                <p>{ingredient.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default IngredientsGroupedByType;
