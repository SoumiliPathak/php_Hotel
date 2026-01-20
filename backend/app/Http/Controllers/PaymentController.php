<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Crypt;
class PaymentController extends Controller
{
    public function pay(Request $req,$id)
    {
      try{
         $amount=(int)$req->amount*100;
         $transaction_id="transaction".now()->timestamp;
         $payload=[
            "merchantId"=>env("MERCHANTID"),
            "merchantTransactionId"=>$transaction_id,
            "merchantBookingId"=>$id,
            "amount"=>$amount,
            "redirectUrl"=>"http://localhost:3000/payment-status?transaction_id=$transaction_id&booking_id=$id",
            "paymentInstrument"=>[
                "type"=>"PAY_PAGE"
            ],
            "customerDetails"=>[
                "email"=>$req->email,
                "phone_no"=>$req->phone_no,
                "name"=>$req->name
            ]
         ];
         $encodedpayload=base64_encode(json_encode($payload));
         $checksum=hash("sha256",$encodedpayload."/pg/v1/pay".env("SALT_KEY"));
         $headers=[
            "Content-Type"=>"application/json",
            "X-VERIFY"=>$checksum."###".env("SALT_INDEX"),
            "accept"=>"application/json"
         ];
         $res=Http::withHeaders($headers)->post("https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",["request"=>$encodedpayload]);
         return response()->json(["url"=>$res->json()['data']['instrumentResponse']['redirectInfo']['url']]);
      }
      catch(Exception $e)
      {
        return response()->json(['message'=>$e->getMessage()]);
      }
    }
}
