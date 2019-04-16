<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GroupQuestion extends Model
{
    use SoftDeletes;
    protected $table = 'group_question';
    protected $fillable = ['*'];
}
