import React from 'react';

export default function Meals(props) {
    const dummy = ["meal", "meal", "meal"]

    return(
        <div>
            {dummy.map(meal => <p>{meal}</p>)}
        </div>
    );
}