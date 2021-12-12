import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PostFrom from "./PostFrom";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";

const headerList = ['シフト日', '名前','ステータス'];

function ShiftTable(props) {
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

    const onClick = () => {
        console.log('頭を傾けて踊って');
        this.style.backgroundColor = "red"
    }

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
                    <TableRow key={index} className={  getShiftStatusClass(row[ 'status']) }>
                        <TableCell align="center" key="0">{row[ 'cast_date']}</TableCell>
                        <TableCell align="center" key="1">{row[ 'user_name']}</TableCell>
                        <TableCell align="center" key="2">{row[ 'status']}</TableCell>
                        <TableCell align="center" key="3">
                            <Button color="secondary" variant="contained" key="3" href="/post/edit/">編集</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        /*<div /!*className={classes.rectangle}*!/ onClick={onClick} >
            <a>あ</a>
            <a>い</a>
            <a>う</a>
            <a>え</a>
            <a>お</a>
        </div>*/
    )
}

export default ShiftTable;
