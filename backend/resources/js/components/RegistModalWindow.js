import React from 'react';
import { TextField, Button } from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";

function RegistModalWindows(props) {
    const {registShiftData, registModal, setRegistModal, registShiftFunction, inputChangeShift} = props;

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

    if ( registModal ) {
        return (
            <div id="overlay" className={classes.overlay}>
                <div id="content" className={classes.content}>
                    <TextField id="cast_date" label="シフト日" variant="outlined" className={classes.textArea} name="cast_date" value={registShiftData.cast_date} onChange={inputChangeShift} />
                    <TextField id="user_name" label="氏名" variant="outlined" className={classes.textArea} name="user_name" value={registShiftData.user_name} onChange={inputChangeShift} />
                    <TextField id="status" type="number" label="ステータス" variant="outlined" className={classes.textArea} name="status" value={registShiftData.status} onChange={inputChangeShift} />
                    <Button color="primary" variant="contained" onClick={registShiftFunction}>登録</Button>
                    <button onClick={() => setRegistModal(false)}>やめる</button>
                </div>
            </div>
        )
    } else {
        return null;
    }
}

export default RegistModalWindows;
