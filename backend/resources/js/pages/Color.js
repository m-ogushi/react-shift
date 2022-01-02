import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ShiftTable from '../components/ShiftTable';
import RegistModalWindow from '../components/RegistModalWindow';

import { RegistModalContext } from "../components/providers/RegistModalProvider";
import { ShiftsContext } from "../components/providers/ShiftsProvider";

import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../components/MainTable';
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
                <div>
                    <form>
                        <TextField label="シフト期間" variant="outlined"  name="cast_term" value="" />
                        <TextField label="タスク名" variant="outlined"  name="name" value=""  />
                        <Button color="primary" variant="contained" href="/" >検索</Button>
                    </form>
                </div>
                <ShiftTable/>
                <Button color="secondary" variant="contained" onClick={() => setRegistModal(true)}>新しいシフトを登録</Button>
                <RegistModalWindow/>
            </div>
        </div>
    </div>
    );
}

export default Color;
