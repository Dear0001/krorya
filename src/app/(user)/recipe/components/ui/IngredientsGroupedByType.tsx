import React from "react";
import {IngredientType} from "@/lib/definition";

type IngredientsGroupedByTypeProps = {
    ingredients?: IngredientType[];
};

const IngredientsGroupedByType: React.FC<IngredientsGroupedByTypeProps> = ({ ingredients = [] }) => {

    const groupedIngredients = ingredients.reduce((groups, ingredient) => {
        if (!groups[ingredient.ingredientType]) {
            groups[ingredient.ingredientType] = [];
        }
        groups[ingredient.ingredientType].push(ingredient);
        return groups;
    }, {} as Record<string, IngredientType[]>);

    const groupedIngredientsEntries = Object.entries(groupedIngredients);

    return (
        <div className={"mt-7"} style={{ width: "100%", overflowX: "auto" }}>
            {groupedIngredientsEntries.map(([type, ingredients]) => (
                <div key={type} style={{ marginBottom: "2rem" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }} className={"rounded-lg"}>
                        <thead className={"bg-gray-50"}>
                        <tr className={"text-secondary"} style={{ borderBottom: "1px solid #e5e7eb" }}>
                            <th style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.875rem", fontWeight: "normal" }}>ឈ្មោះ</th>
                            <th style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.875rem", fontWeight: "normal" }}>ចំនួនបរិមាណ</th>
                            <th style={{ padding: "0.75rem", textAlign: "left", fontSize: "0.875rem", fontWeight: "normal" }}>តម្លៃ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ingredients.map((ingredient) => (
                            <tr key={ingredient.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <td style={{ padding: "0.75rem",  fontSize: "0.875rem" }}>{ingredient.name}</td>
                                <td style={{ padding: "0.75rem",  fontSize: "0.875rem" }}>{ingredient.quantity}</td>
                                <td style={{ padding: "0.75rem",  fontSize: "0.875rem" }}>{ingredient.price} រៀល</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default IngredientsGroupedByType;