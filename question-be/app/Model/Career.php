<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    protected $fillable = ['*'];


    public static function getAll()
    {
        return self::all();
    }
}
