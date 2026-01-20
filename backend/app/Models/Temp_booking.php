<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Temp_booking extends Model
{
    protected $fillable=['name','email','phone_no','dob','sex','user_id','room_id','check_in_date','check_out_date','no_of_boarders','amount'];
}
