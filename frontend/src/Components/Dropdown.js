import React from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as actions from "../Redux/actionCreators"


export default function Dropdown({label, value, options, onChange}) {

    return (
        <label>
            {label}
            {console.log("Dropdown options:",)}
            <select value={value} onChange={onChange}>
                {options.map((option) => {
                    console.log("each option:", option)
                    return <option value={option.value}>{option.label}</option>
                })}
            </select>
        </label>
    )

}