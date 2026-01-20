<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Room;
class Room_image extends Model
{
    protected $fillable=['image','room_id'];
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
