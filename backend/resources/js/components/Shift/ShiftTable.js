import React, {useContext, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PostFrom from "./PostFrom";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {RegistModalContext} from "../providers/RegistModalProvider";
import axios from "axios";
import {ShiftsContext} from "../providers/ShiftsProvider";

const headerList = ['シフト日', '名前','ステータス'];

function ShiftTable() {
    const {registModal, setRegistModal} = useContext(RegistModalContext);
    const {shifts, setShifts} = useContext(ShiftsContext);

    const useStyles = makeStyles({
        rectangle: {
            backgroundColor: "blue"
        },
        provision: {
            backgroundColor: "lightpink"
        },
        pending: {
            backgroundColor: "lightgreen"
        },
        confirm: {
            backgroundColor: "lightblue"
        }
    });

    const classes = useStyles();

    useEffect(() => {
        getShiftsData();
    },[]);

    //バックエンドからpostsの一覧を取得する処理
    const getShiftsData = () => {
        axios
            //.get('/api/posts')
            .get('/api/shift/list')
            .then(response => {
                setShifts(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

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
        setRegistModal( shift_id );
    }

    const deleteShift = async( shift_id, shift_index ) => {
        await axios
            .post('/api/shift/delete', {
                id: shift_id,
            })
            .then((res) => {
                //戻り値をtodosにセット
                /*const tempPosts = shifts;

                deleteShiftIndex( tempPosts, shift_index.index );
                setShifts(tempPosts);*/

                const tempPosts = [...shifts];
                tempPosts.splice(shift_index.index, 1);
                setShifts(tempPosts);
            })
            .catch(error => {
                console.log(error);
            });
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
                {shifts.map((row, index) => (
                    <TableRow key={index} className={getShiftStatusClass(row['status'])}>
                        <TableCell align="center" key="0">{row['cast_date']}</TableCell>
                        <TableCell align="center" key="1">{row['user_name']}</TableCell>
                        <TableCell align="center" key="2">{row['status']}</TableCell>
                        <TableCell align="center" key="3">
                            <Button color="secondary" variant="contained" key="3"
                                    onClick={() => editRegistModal(row['id'])}>編集</Button>
                        </TableCell>
                        <TableCell align="center" key="4">
                            <Button color="secondary" variant="contained" key="4"
                                    onClick={() => deleteShift(row['id'], {index})}>削除</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ShiftTable;
