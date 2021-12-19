import {createContext, useState} from "react";

export const RegistModalContext = createContext({});

export const RegistModalProvider = props => {
    const { children } = props;

    const [registModal, setRegistModal] = useState(false);

    return (
        <RegistModalContext.Provider value = {{ registModal, setRegistModal }}>
            {children}
        </RegistModalContext.Provider>
    )
}
