<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;

class ReviewController extends Controller
{
    public function add(Request $req)
    {
        $user=$req->user();
       Review::create(['ratings'=>$req->ratings,
                        'review'=>$req->review,
                        'user_id'=>$user->id]);
      return response()->json(['message'=>"Review is added successfully"]);
    }
    public function show($from=null)
    {
        $data=Review::with('user');
        if($from)
        return response()->json(['data'=>$data->limit(3)->get()]);
       else
        return response()->json(['data'=>$data->get()]);
    }
    public function delete(Request $req,$id)
    {
        $review=Review::find($id);
        $user=$req->user();
        if($user->id==$review->user_id)
        {
            $review->delete();
            return response()->json(['message'=>"Review is deleted"]);
        }
       else
          return response()->json(['message'=>"You're not allowed to do this"]);
    }
    public function edit(Request $req,$id)
    {
        $review=Review::find($id);
        $user=$req->user();
        if($user->id==$review->user_id)
        {
            $review->update(['ratings'=>$req->ratings,
                           'review'=>$req->review]);
            return response()->json(['message'=>"Review is updated successfully"]);
        }
       else
          return response()->json(['message'=>"You're not allowed to do this"]);
    }
}
