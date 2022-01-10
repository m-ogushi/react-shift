import {Button, TextField} from "@material-ui/core";
import React, {useContext, useState} from "react";
import {ShiftsContext} from "../providers/ShiftsProvider";
import axios from "axios";

function ShiftSearch() {

    const {shifts, setShifts} = useContext(ShiftsContext);
    const [searchShiftData,setSearchShiftData] = useState({ term_start:'', term_end:'', cast_name:'' });

    const inputSearchShift = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        searchShiftData[key] = value;
        let data = Object.assign({}, searchShiftData);
        setSearchShiftData(data);
    }

    const searchShift = async() => {
        await axios
            .post('/api/shift/search', {
                term_start: searchShiftData.term_start,
                term_end: searchShiftData.term_end,
                cast_name: searchShiftData.cast_name
            })
            .then(response => {
                setShifts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <TextField label="シフト開始期間" variant="outlined"  name="term_start" value={searchShiftData.term_start} onChange={inputSearchShift}/>
            <TextField label="シフト終了期間" variant="outlined"  name="term_end" value={searchShiftData.term_end} onChange={inputSearchShift}/>
            <TextField label="名前" variant="outlined"  name="cast_name" value={searchShiftData.cast_name} onChange={inputSearchShift}/>
            <Button color="primary" variant="contained" onClick={searchShift}>検索</Button>
        </div>
    )
}

export default ShiftSearch;
