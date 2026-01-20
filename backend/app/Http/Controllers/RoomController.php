<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Room;
use App\Models\Room_image;
use App\Models\Booking;
class RoomController extends Controller
{
    public function add(Request $req)
    {
        $req->validate(['name'=>'required','no_of_rooms'=>'required','price'=>'required','images'=>'required','images.*'=>'mimes:jpg,jpeg,png']);
        $room=Room::create(['room_name'=>$req->name,
                      'description'=>$req->desc,
                      'price'=>$req->price,
                      'ratings'=>$req->ratings,
                      'area'=>$req->area,
                      'max_capacity'=>$req->capacity,
                      'num_of_rooms'=>$req->no_of_rooms
       ]);
        foreach($req->file('images') as $image)
        {
          $path=$image->store('images','public');
         Room_image::create(['image'=>$path,
                              'room_id'=>$room->id
         ]);    
        }
       return response()->json(['message'=>"Room is added"]);
    }
    public function show(Request $req)
    {
      $data=Room::with('images');
      if($req->query('keyword')!='null')
        $data->where('room_name','like',"%{$req->query('keyword')}%")->orWhere('description','like',"%{$req->query('keyword')}%");
      if($req->query('minprice')!='null' && $req->query('maxprice')!='null')
        $data->whereBetween('price',[$req->query('minprice'),$req->query('maxprice')]);
      if($req->query('ratings')!='null')
        $data->where('ratings',$req->query('ratings'));
      if($req->query('capacity')!='null')
         $data->where('max_capacity',$req->query('capacity'));
      return response()->json(['data'=>$data->get()]);
    }
    public function show_details($id)
    {
      $data=Room::with('images')->find($id);
      return response()->json(['data'=>$data]);
    }
    public function filter(Request $req)
    {
      $req->validate(['check_in_date'=>'required|date|after_or_equal:today','check_out_date'=>'required|date|after:check_in_date','no_of_boarders'=>'required']);
      $data=[];
      $rooms=Room::with('images')->where('max_capacity',$req->no_of_boarders)->get();
      foreach($rooms as $room)
      {
        $count=Booking::where('room_id',$room->id)->where('check_in_date','<=',$req->check_out_date)->where('check_out_date','>=',$req->check_in_date)->count();
        if($count==0)
         $data[]=$room;
        else
        {
          if($room->num_of_rooms>$count)
            $data[]=$room;
        }
      }
      return response()->json(['data'=>$data]);
    }
    public function delete($id)
    {
      Room::find($id)->delete();
      return response()->json(['message'=>"Room is deleted"]);
    }
    public function edit(Request $req,$id)
    {
      $req->validate(['name'=>'required','no_of_rooms'=>'required','price'=>'required','images.*'=>'mimes:jpg,jpeg,png']);
      Room::find($id)->update(['room_name'=>$req->name,
                      'description'=>$req->desc,
                      'price'=>$req->price,
                      'ratings'=>$req->ratings,
                      'area'=>$req->area,
                      'max_capacity'=>$req->capacity,
                      'num_of_rooms'=>$req->no_of_rooms,
                    ]);
      if($req->file('images'))
      {
        $image_instances=Room_Image::where('room_id',$id)->get();
        foreach($image_instances as $image_instance)
        {
          $image_instance->delete();
        }
        foreach($req->file('images') as $image)
          {
            $path=$image->store('images','public');
            Room_image::create(['image'=>$path,
                                 'room_id'=>$id
                               ]);
          }
      }
      return response()->json(['message'=>"Room details are updated successfully"]);
    }
}
