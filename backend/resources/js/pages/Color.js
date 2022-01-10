import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ShiftSearch from "../components/Shift/ShiftSearch";
import ShiftTable from '../components/Shift/ShiftTable';
import RegistModalWindow from '../components/Shift/RegistModalWindow';

import { RegistModalContext } from "../components/providers/RegistModalProvider";
import { ShiftsContext } from "../components/providers/ShiftsProvider";

import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../components/Shift/MainTable';
import TableCell from "@material-ui/core/TableCell";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from "@material-ui/core/TableRow";
import TableBody from '@material-ui/core/TableBody';
import {Button, TextField} from "@material-ui/core";

function Color() {

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

export default Color;
