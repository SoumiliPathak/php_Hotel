<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Room;
use App\Models\User;

class Booking extends Model
{
    protected $fillable=['name','email','phone_no','dob','sex','user_id','room_id','check_in_date','check_out_date','no_of_boarders','amount','transaction_id'];
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
