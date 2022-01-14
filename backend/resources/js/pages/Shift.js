import React, { useState, useEffect, useContext } from 'react';

import ShiftSearch from "../components/Shift/ShiftSearch";
import ShiftTable from '../components/Shift/ShiftTable';
import RegistModalWindow from '../components/Shift/RegistModalWindow';

import { RegistModalContext } from "../components/providers/RegistModalProvider";
import {Button, TextField} from "@material-ui/core";

function Shift() {

    const {setRegistModal} = useContext(RegistModalContext);

    return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-10">
                <ShiftSearch/>
                <ShiftTable/>
                <Button color="secondary" variant="contained" onClick={() => setRegistModal(true)}>新しいシフトを登録</Button>
                <RegistModalWindow/>
            </div>
        </div>
    </div>
    );
}

export default Shift;
