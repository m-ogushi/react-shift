import React, {useContext, useEffect, useState} from 'react';
import { TextField, Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import {RegistModalContext} from "../providers/RegistModalProvider";
import { ShiftsContext } from "../providers/ShiftsProvider";
import axios from "axios";

function RegistModalWindows() {

    const {registModal, setRegistModal} = useContext(RegistModalContext);
    const {shifts, setShifts} = useContext(ShiftsContext);

    const [registShiftData,setRegistShiftData] = useState({ cast_date:'', user_name:'', status:''}); //

    const useStyles = makeStyles({
        overlay: {
            position: "fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            backgroundColor:"rgba(0,0,0,0.5)",

            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        content: {
            zIndex:2,
            width:"50%",
            padding: "1em",
            background:"#fff"
        }
    });

    const classes = useStyles();

    useEffect(() => {
        if ( typeof( registModal ) === "number" ) {
            findEditShift();
        } else {
            setRegistShiftData({cast_date: '', user_name: '', status: ''});
        }
    },[registModal])
    const inputChangeShift = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        registShiftData[key] = value;
        let data = Object.assign({}, registShiftData);
        setRegistShiftData(data);
    }, findEditShift = async () => {
        await axios
            .post('/api/shift/find', {
                id: registModal,
            })
            .then((res) => {
                setRegistShiftData({
                    cast_date: res.data.cast_date,
                    user_name: res.data.user_name,
                    status: res.data.status
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, changeShiftFunction = async () => {
        if (registShiftData == '') {
            return;
        }

        if (typeof (registModal) === "number") {
            editShiftFunction();
        } else {
            registShiftFunction();
        }
    }, registShiftFunction = async () => {

        await axios
            .post('/api/shift/regist', {
                cast_date: registShiftData.cast_date,
                user_name: registShiftData.user_name,
                status: registShiftData.status,
            })
            .then((res) => {
                //????????????todos????????????
                const tempPosts = shifts
                tempPosts.push(res.data);
                setShifts(tempPosts);

                setRegistModal(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, editShiftFunction = async () => {
        await axios
            .post('/api/shift/edit', {
                id: registModal,
                cast_date: registShiftData.cast_date,
                user_name: registShiftData.user_name,
                status: registShiftData.status,
            })
            .then((res) => {
                //????????????todos????????????
                const tempPosts = shifts;
                getShiftIndex(tempPosts, res.data);
                setShifts(tempPosts);

                setRegistModal(false);
            })
            .catch(error => {
                console.log(error);
            });
    }, getShiftIndex = (tempPosts, edit_data) => {
        const result = tempPosts.filter(value => {
            if (value.id === registModal) {
                value.cast_date = edit_data.cast_date;
                value.user_name = edit_data.user_name;
                value.status = edit_data.status;
                return value
            }
        });
    };


    if ( registModal === true || typeof( registModal ) === "number" ) {
        return (
            <div id="overlay" className={classes.overlay}>
                <div id="content" className={classes.content}>
                    <TextField id="cast_date" label="????????????" variant="outlined" className={classes.textArea} name="cast_date" value={registShiftData.cast_date} onChange={inputChangeShift} />
                    <TextField id="user_name" label="??????" variant="outlined" className={classes.textArea} name="user_name" value={registShiftData.user_name} onChange={inputChangeShift} />
                    <TextField id="status" type="number" label="???????????????" variant="outlined" className={classes.textArea} name="status" value={registShiftData.status} onChange={inputChangeShift} />
                    <Button color="primary" variant="contained" onClick={changeShiftFunction}>??????</Button>
                    <button onClick={() => setRegistModal(false)}>?????????</button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default RegistModalWindows;
