<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Temp_booking;
class Temp_bookingsController extends Controller
{
    public function add(Request $req)
    {
        $req->validate(['email'=>'required|email',
        'name'=>'required',
         'phone_no'=>'required|digits:10',
         'date_of_birth'=>'required',
         'age'=>'numeric|min:18',
          'number_of_boarders'=>'required']);
    $user=$req->user();
    $booking=Temp_booking::create(['name'=>$req->name,
        'email'=>$req->email,
        'phone_no'=>$req->phone_no,
        'dob'=>$req->date_of_birth,
         'sex'=>$req->sex,
         'user_id'=>$user->id,
          'room_id'=>$req->room_id,
          'check_in_date'=>$req->chk_in_date,
          'check_out_date'=>$req->chk_out_date,
          'no_of_boarders'=>$req->number_of_boarders,
          'amount'=>$req->amount]);
    return response()->json(['temp_booking_id'=>$booking->id]);
  }
}
