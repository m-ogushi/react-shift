import {createContext, useState} from "react";

export const ShiftsContext = createContext({});

export const ShiftsProvider = props => {
    const { children } = props;

    const [shifts, setShifts] = useState([]);

    return (
        <ShiftsContext.Provider value = {{ shifts, setShifts }}>
            {children}
        </ShiftsContext.Provider>
    )
}
