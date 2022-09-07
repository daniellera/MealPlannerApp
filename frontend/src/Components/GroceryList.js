import React from 'react';

export default function GroceryList() {
    const dummy = [{
        toBePurchased: true,
        name: "ingredient",
        amount: "1 pinch"
    }, {
        toBePurchased: true,
        name: "ingredient2",
        amount: "2 pinches"
    }]

    return(
        <div>
            {dummy.map(ingredient => {
                return (
                    <div className="grocery-list-item">
                        <p>{ingredient.toBePurchased ? "Y" : "N"}</p>
                        <p>{ingredient.amount}</p>
                        <p>{ingredient.name}</p>
                    </div>
                )
            })}
        </div>
    );
}