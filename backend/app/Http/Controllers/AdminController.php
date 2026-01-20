<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
class AdminController extends Controller
{
    public function add(Request $req)
    {
        $req->validate(['email'=>'required|email',
                      'password'=>['required',Password::min(4)->letters()->numbers()->symbols()->mixedCase()]
                      ]);
       $count=Admin::count();
       if($count>0)
         return response()->json(['message'=>"Unauthorised Attempt"]);
      $pw=Hash::make($req->password);
      Admin::create(['email'=>$req->email,'password'=>$pw]);
      return response()->json(['message'=>"Registered successfully"]);
    }
    public function login(Request $req)
    {
        $req->validate(['email'=>'required',
                        'password'=>'required'
                      ]);
      if(Auth::guard('admin')->attempt(['email'=>$req->email,'password'=>$req->password]))
      {
        $admin=Auth::guard('admin')->user();
        $token=$admin->createToken('admin_token')->plainTextToken;
        return response()->json(['message'=>"Login successfull", 
                                  'token'=>$token
                                ]);
      }
      else
        return response()->json(['message'=>"Invalid Credentials"]);
    }
    public function logout(Request $req)
    {
      $admin=$req->user();
      $admin->tokens()->delete();
      return response()->json(['message'=>"You are logged out"]);
    }
}
