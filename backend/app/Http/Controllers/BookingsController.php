<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Crypt;
use App\Models\Booking;
use App\Models\Room;
use App\Models\User;
use App\Models\Temp_booking;
class BookingsController extends Controller
{
    public function check_availability(Request $req,$id)
    {
        $req->validate(['check_in_date'=>'required|date|after_or_equal:today',
                         'check_out_date'=>'required|date|after:check_in_date']);
      $count=Booking::where('room_id',$id)->where('check_in_date','<=',$req->check_out_date)->where('check_out_date','>=',$req->check_in_date)->count();
      if($count>0)
      {
        $room=Room::select('num_of_rooms')->find($id);
        if($count==$room->num_of_rooms)
         return response()->json(['flag'=>false]);
      }
      return response()->json(['flag'=>true]);
    }
    public function add($transaction_id,$booking_id)
    {
     try
     {
      $checksum=hash("sha256","/pg/v1/status/".env("MERCHANTID")."/$transaction_id".env("SALT_KEY"));
      $headers=[
        "Content-Type"=>"application/json",
        "X-VERIFY"=>$checksum."###".env("SALT_INDEX"),
        "X-MERCHANT-ID"=>env("MERCHANTID")
      ];
      $res=Http::withHeaders($headers)->get("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/".env("MERCHANTID")."/$transaction_id");
      $data=Temp_booking::find($booking_id);
      if($res->json()['code']=="PAYMENT_SUCCESS")
      {
        Booking::create(['name'=>$data->name,
        'email'=>$data->email,
        'phone_no'=>$data->phone_no,
        'dob'=>$data->dob,
         'sex'=>$data->sex,
         'user_id'=>$data->user_id,
          'room_id'=>$data->room_id,
          'check_in_date'=>$data->check_in_date,
          'check_out_date'=>$data->check_out_date,
          'no_of_boarders'=>$data->no_of_boarders,
          'amount'=>$data->amount,
           'transaction_id'=>$transaction_id
          ]);
        $data->delete();
        return response()->json(['message'=>'Room is booked successfully','success'=>true]);
      }
      else
      {
        $data->delete();
        return response()->json(['message'=>'Payment failed.Please try again','success'=>false]);
      }
     }
     catch(Exception $e)
      {
        return response()->json(['message'=>$e->getMessage()]);
      }
    }
    public function show_current_bookings(Request $req)
    {
        $user=$req->user();
        $today=today();
        $data=Booking::with('room')->with('room.images')->where('user_id',$user->id)->where('check_out_date','>=',$today)->get();
        return response()->json(['data'=>$data]);
    }
    public function show_past_bookings(Request $req)
    {
        $user=$req->user();
        $today=today();
        $data=Booking::with('room')->with('room.images')->where('user_id',$user->id)->where('check_out_date','<',$today)->get();
        return response()->json(['data'=>$data]);
    }
    public function show_all()
    {
        $today=today();
        $data=Booking::with('room')->with('user')->with('room.images')->where('check_out_date','>=',$today)->get();
        return response()->json(['data'=>$data]);
    }
    public function delete($id)
    {
        $booking=Booking::find($id);
        try{
           $refund_id="Refund".now()->timestamp;
           $payload=[
            "merchantId"=>env("MERCHANTID"),
            "originalTransactionId"=>$booking->transaction_id,
            "merchantTransactionId"=> $refund_id,
            "amount"=>$booking->amount
           ];
        $encodedPayload=base64_encode(json_encode($payload));
        $checksum=hash("sha256",$encodedPayload."/pg/v1/refund".env("SALT_KEY"));
        $headers=[
          "Content-Type"=>"application/json",
          "X-VERIFY"=>$checksum."###".env("SALT_INDEX"),
          "X-MERCHANT-ID"=>env("MERCHANTID")
        ];
        $res=Http::withHeaders($headers)->post("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/refund",["request"=>$encodedPayload]);
        $booking->delete();
        return response()->json(['message'=>"Booking is cancelled and refund is initiated"]);
      }
        catch(Exception $e)
        {
          return response()->json(['message'=>$e->getMessage()]);
        }
    }
}
