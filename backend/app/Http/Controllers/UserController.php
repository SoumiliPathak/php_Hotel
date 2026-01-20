<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
class UserController extends Controller
{
    public function add(Request $req)
    {
        $req->validate(['email'=>'required|email',
                         'password'=>['required',Password::min(4)->letters()->numbers()->symbols()->mixedCase()],
                         'name'=>'required',
                          'phone_no'=>'required|digits:10',
                          'date_of_birth'=>'required',
                          'age'=>'numeric|min:18']);
        $path=null;
        if($req->file('image'))
        $path=$req->file('image')->store('images','public');
        $pw=Hash::make($req->password);
        User::create(['email'=>$req->email,
                       'password'=>$pw,
                       'name'=>$req->name,
                        'phone_no'=>$req->phone_no,
                        'dob'=>$req->date_of_birth,
                        'sex'=>$req->sex,
                        'image'=>$path]);
      return response()->json(['message'=>"Registered successfully"]);
    }
    public function login(Request $req)
    {
        $req->validate(['email'=>'required',
                        'password'=>'required']);
        if(Auth::attempt(['email'=>$req->email,'password'=>$req->password]))
          {
         $user=Auth::user();
         $token=$user->createToken('user_token')->plainTextToken;
        return response()->json(['message'=>"Login successfull",
                                  'token'=>$token]);
          }
          else
          return response()->json(['message'=>"Invalid Credentials"]);
    }
    public function logout(Request $req)
    {
      $user=$req->user();
      $user->tokens()->delete();
      return response()->json(['message'=>"You are logged out"]);
    }
    public function show(Request $req)
    {
      $user=$req->user();
      return response()->json(['data'=>$user]);
    }
    public function show_all()
    {
      $data=User::all();
      return response()->json(['data'=>$data]);
    }
    public function delete(Request $req)
    {
      $user=$req->user();
      $user->tokens()->delete();
      $user->delete();
      return response()->json(['message'=>"Account is deleted"]);
    }
    public function edit(Request $req)
    {
      $req->validate(['password'=>['required',Password::min(4)->letters()->numbers()->symbols()->mixedCase()],
                         'name'=>'required',
                          'date_of_birth'=>'required',
                          'age'=>'numeric|min:18']);
     if($req->file('image'))
      $path=$req->file('image')->store('images','public');
    else if($req->image)
        $path=$req->image;
    else
      $path=null;
     $pw=Hash::make($req->password);
      $user=$req->user();
      $user->update(['password'=>$pw,
                       'name'=>$req->name,
                        'dob'=>$req->date_of_birth,
                        'sex'=>$req->sex,
                         'image'=>$path]);
    return response()->json(['message'=>"Details are updated successfully"]);                    
    }
    public function forgot_password(Request $req)
    {
      $req->validate(['email'=>'required|email']);
      $flag=User::where('email',$req->email)->exists();
      if(!$flag)
        return response()->json(['message'=>"No user found"]);  
      $otp=random_int(100000,999999);
      Mail::send([],[],function($message) use ($otp,$req){
        $message->to($req->email)->subject("Forgot Password")->html("<h3>Your OTP is {$otp}</h3>",'text/html');
      });
      return response()->json(['otp'=>$otp]);
    }
    public function forgot_password_login(Request $req)
    {
      $user=User::where('email',$req->email)->first();
      $token=$user->createToken('user_token')->plainTextToken;
      return response()->json(['message'=>"Login successfull",
                                'token'=>$token]);
    }
}
