import React, {useContext} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PostFrom from "./PostFrom";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {RegistModalContext} from "./providers/RegistModalProvider";
import axios from "axios";

const headerList = ['シフト日', '名前','ステータス'];

function ShiftTable(props) {
    const {registModal, setRegistModal} = useContext(RegistModalContext);

    const useStyles = makeStyles({
        rectangle: {
            backgroundColor: "blue"
        },
        provision: {
            backgroundColor: "yellow"
        },
        pending: {
            backgroundColor: "orange"
        },
        confirm: {
            backgroundColor: "lightblue"
        }
    });

    const classes = useStyles();

    const { shift_rows } = props;

    const getShiftStatusClass = (status) => {
        switch( parseInt(status) ) {
            case 1:
                return classes.provision;
            case 2:
                return classes.pending;
            case 3:
                return classes.confirm;
        }
    }

    function editRegistModal( shift_id ) {
        console.log( "レジェンド" );
        console.log( shift_id );
        console.log( Number( shift_id ) );
        setRegistModal( shift_id );
    }

    return (
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {headerList.map((item, index) => (
                        <TableCell align="center" key={index}>{item}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {shift_rows.map((row, index) => (
                    <TableRow key={index} className={ getShiftStatusClass(row[ 'status']) }>
                        <TableCell align="center" key="0">{row[ 'cast_date']}</TableCell>
                        <TableCell align="center" key="1">{row[ 'user_name']}</TableCell>
                        <TableCell align="center" key="2">{row[ 'status']}</TableCell>
                        <TableCell align="center" key="3">
                            <Button color="secondary" variant="contained" key="3" onClick={() => editRegistModal(row[ 'id'])}>編集</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ShiftTable;
