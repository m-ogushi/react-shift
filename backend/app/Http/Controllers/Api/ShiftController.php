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


    public function find( Request $request )
    {
        $shift = Shift::find( $request->id );
        return response()->json($shift, 200);
    }


    public function edit( Request $request )
    {
        $shift = Shift::find( $request->id );
        $shift->cast_date = $request->cast_date;
        $shift->user_name = $request->user_name;
        $shift->status    = $request->status;
        $shift->save();
        return response()->json($shift, 200);
    }


    public function delete( Request $request )
    {
        $shift = Shift::find( $request->id )->delete();
        return response()->json($shift, 200);
    }


    public function search( Request $request )
    {
        [$from,$to ,$cast_name] = [ $request->term_start, $request->term_end, $request->cast_name ];

        if( !empty( $from ) && !empty( $to ) ) {
            $shift = Shift::whereBetween('cast_date', [ $request->term_start, $request->term_end ] );
        } else if( !empty( $from ) && empty( $to ) ) {
            $shift = Shift::where('cast_date', ">=", $from );
        } else if( empty( $from ) && !empty( $to ) ) {
            $shift = Shift::where('cast_date', "<=", $to );
        } else {
            $shift = new Shift;
        }

        if ( !empty( $cast_name ) ) {
            $shift = $shift->where('user_name', "=", $cast_name );
        }
        $shift = $shift->get();
        return response()->json($shift, 200);
    }


}
