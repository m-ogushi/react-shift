import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import ShiftTable from '../components/ShiftTable';
import RegistModalWindow from '../components/RegistModalWindow';

import RegistModalContext from "../components/providers/RegistModalProvider";

import { makeStyles, createStyles } from '@material-ui/core/styles';
import MainTable from '../components/MainTable';
import TableCell from "@material-ui/core/TableCell";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from "@material-ui/core/TableRow";
import TableBody from '@material-ui/core/TableBody';
import {Button} from "@material-ui/core";

function Color() {

    const [shifts, setShifts] = useState([]);
    const [registModal, setRegistModal] = useState(false);
    const [registShiftData,setRegistShiftData] = useState({cast_date:'', user_name:'', status:''});
    //const {registModal, setRegistModal} = useContext(RegistModalContext);

    const onClick = () => {
                console.log('頭を傾けて踊って');
                this.style.backgroundColor = "red"
    }

    const openRegistModal = () => {
        setRegistModal(true)
    }

    useEffect(() => {
        getShiftsData();
    },[])

    //バックエンドからpostsの一覧を取得する処理
    const getShiftsData = () => {
        axios
            //.get('/api/posts')
            .get('/api/shift/list')
            .then(response => {
                setShifts(response.data);
                //setPosts(response.data);     //バックエンドから返ってきたデータでpostsを更新する
                console.log(response.data);　//取得データ確認用のconsole.log()
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    const registShiftFunction = async() => {
        //空だと弾く
        if(registShiftData == ''){
            return;
        }

        //入力値を投げる
        await axios
            .post('/api/shift/regist', {
                cast_date: registShiftData.cast_date,
                user_name: registShiftData.user_name,
                status: registShiftData.status,
            })
            .then((res) => {
                //戻り値をtodosにセット
                const tempPosts = shifts
                setRegistModal(false);
                tempPosts.push(res.data);
                setShifts(tempPosts)
                setRegistShiftData({cast_date:'', user_name:'', status:''});
            })
            .catch(error => {
                console.log(error);
            });
    }

    const inputChangeShift = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        registShiftData[key] = value;
        let data = Object.assign({}, registShiftData);
        setRegistShiftData(data);
    }

    //空配列として定義する
    let shift_rows = [];
    //postsの要素ごとにrowsで使える形式に変換する
    shifts.map((shift) =>
        shift_rows.push({
            cast_date: shift.cast_date,
            user_name: shift.user_name,
            status: shift.status,
        })
    );

    return (
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-10">
                <ShiftTable  shift_rows={shift_rows} />
                <Button color="secondary" variant="contained" onClick={() => setRegistModal(true)}>新しいシフトを登録</Button>
                <RegistModalWindow registShiftData={registShiftData} registModal={registModal} setRegistModal={ setRegistModal } registShiftFunction={registShiftFunction} inputChangeShift={inputChangeShift}/>
            </div>
        </div>
    </div>
    );
}

export default Color;
