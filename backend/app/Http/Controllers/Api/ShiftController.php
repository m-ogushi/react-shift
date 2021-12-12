<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    public function index()
    {
        $posts = shift::all();
        return response()->json($posts, 200);
    }


    public function list()
    {
        $shifts = Shift::all();
        return response()->json($shifts, 200);
    }


    public function regist( Request $request )
    {
        $shift = new Shift;
        $shift->cast_date = $request->cast_date;
        $shift->user_name = $request->user_name;
        $shift->status    = $request->status;
        $shift->save();
        return response()->json($shift, 200);
    }

}
