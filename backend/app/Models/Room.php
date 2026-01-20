<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Room_image;
use App\Models\Booking;
class Room extends Model
{
    protected $fillable=['room_name','description','price','ratings','area','max_capacity','num_of_rooms'];
    public function images()
    {
        return $this->hasMany(Room_image::class);
    }
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
